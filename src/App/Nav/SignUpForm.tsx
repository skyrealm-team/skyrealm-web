import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStores } from 'stores/index';
import { useOnSubmit } from 'shared/hooks';
import { REGISTER_INPUT, REGISTER } from 'graphql/login';
import { InputField, SelectField } from 'components/Fields';
import { User } from 'graphql/commonTypes';
import { LOCAL_STORE_KEY, saveToLocalStorage } from 'shared/utils/localStorage';
import { Size, Variant } from 'shared/enums';
import AsyncButton from 'components/AsyncButton';
import { mutateWithMessage } from 'shared/utils/graphql';
import {
  validateEmail,
  validatePassword,
  validatePhoneNum,
  validateRequire,
  validateRequireCreator,
} from 'shared/utils/validate';
import Flex from 'components/Flex';
import {
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { privacyPolicy, termsOfService } from 'shared/constants/links';
import { useToggle } from 'react-use';
import Message from 'components/Message';
import theme from 'shared/theme';

const useAction = (checked: boolean) => {
  const { profileStore } = useRootStores();
  return useCallback(
    async (formFields: REGISTER_INPUT) => {
      if (!checked) {
        Message.warning('Please agree Terms of Service and Privacy Policy ');
        return;
      }
      const { data } = await mutateWithMessage<User, REGISTER_INPUT>({
        mutation: REGISTER,
        variables: formFields,
      });
      profileStore.setProfile(data || null);
      saveToLocalStorage(LOCAL_STORE_KEY.accessToken, data?.authToken);
    },
    [profileStore, checked],
  );
};

export enum SelectedUserTypeEnum {
  broker = 'Broker',
  Tenant = 'Tenant',
  Landlord = 'Landlord',
  realEstateFund = 'Real Estate Fund',
  others = 'Others',
}

const validateUserType = validateRequireCreator('Describes');
const SignUpForm = () => {
  const { profileStore } = useRootStores();
  const [checked, setChecked] = useToggle(false);
  const [isViewPassword, toggleViewPassword] = useToggle(false);
  const action = useAction(checked);
  const { formRef, onSubmit } = useOnSubmit<REGISTER_INPUT>(action);
  const [selectedUserType, setSelectedUserType] = useState('');
  const isUserTypeOthers = selectedUserType === SelectedUserTypeEnum.others;
  if (!profileStore.isSignUp) {
    return null;
  }
  return (
    <form
      ref={formRef}
      onSubmit={() => {
        return false;
      }}
    >
      <Flex className="mt30 gap20" itemClass="flex1">
        <InputField required label="First name" name="firstName" validate={validateRequire} />
        <InputField required label="Last name" name="lastName" validate={validateRequire} />
      </Flex>
      <Flex className="mt30 gap20" itemClass="flex1">
        <InputField required label="Organization" name="organization" validate={validateRequire} />
        <InputField label="Phone Number" name="phoneNumber" validate={validatePhoneNum} />
      </Flex>
      <Flex className="mt30 gap20" itemClass="flex1" align={Flex.ALIGN.end}>
        <SelectField
          required
          value={selectedUserType}
          label="What best describes you"
          name={isUserTypeOthers ? '' : 'userType'}
          onChange={(e: SelectChangeEvent<unknown>) => {
            setSelectedUserType(String(e.target.value));
          }}
          validate={validateRequire}
        >
          {Object.values(SelectedUserTypeEnum).map((userType, index) => {
            return (
              <MenuItem key={index} value={userType}>
                {userType}
              </MenuItem>
            );
          })}
        </SelectField>
        {isUserTypeOthers ? (
          <InputField name="userType" validate={validateUserType} placeholder="Please specify" />
        ) : null}
      </Flex>
      <InputField
        className="mt30"
        required
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
        placeholder="Corporate email only"
        validate={validateEmail}
      />
      <InputField
        className="mt30"
        required
        label="Password"
        name="password"
        autoComplete="current-password"
        type={isViewPassword ? 'text' : 'password'}
        placeholder="Minimum 6 characters"
        validate={validatePassword}
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              size={Size.sm}
              aria-label="toggle password visibility"
              onClick={toggleViewPassword}
              edge="end"
              sx={{ right: '20px' }}
            >
              {isViewPassword ? (
                <VisibilityOffOutlined className="gray-main f20" />
              ) : (
                <VisibilityOutlined className="gray-main f20" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormControlLabel
        className="mt30"
        control={
          <Checkbox
            checked={checked}
            onChange={setChecked}
            sx={{
              position: 'relative',
              top: '-9px',
              alignSelf: 'flex-start',
              '&.Mui-checked': {
                color: theme.palette.success.main,
              },
            }}
          />
        }
        label={
          <>
            Creating an account means you’re okay with our{' '}
            <Link target="_blank" href={termsOfService}>
              Terms of Service
            </Link>
            ,{' '}
            <Link target="_blank" href={privacyPolicy}>
              Privacy Policy
            </Link>
            , and our default Notification Settings.
          </>
        }
      />
      <AsyncButton className="mt45" fullWidth variant={Variant.contained} size={Size.lg} onClick={onSubmit}>
        Create Account
      </AsyncButton>
    </form>
  );
};

export default observer(SignUpForm);
