import React, { FC } from 'react';
import { AppBar, Toolbar, Stack, MenuItem, AppBarProps } from '@mui/material';
import { useFormik } from 'formik';
import { useUpdateEffect } from 'react-use';
import PlaceField from 'components/PlaceField';
import SelectField from 'components/SelectField';

type FilterValues = {
  address?: string;
  for?: 'lease' | 'sale';
  spaceUse?: string;
};

export type FiltersBarProps = {
  initialValues?: FilterValues;
  onChange?: (values: FilterValues) => void;
  AppBarProps?: Omit<AppBarProps, 'onChange'>;
};
const FiltersBar: FC<FiltersBarProps> = ({ initialValues, onChange, AppBarProps }) => {
  const formik = useFormik<FilterValues>({
    initialValues: {
      address: '',
      for: 'lease',
      spaceUse: '',
      ...initialValues,
    },
    onSubmit: () => {},
  });

  useUpdateEffect(() => {
    formik.setFieldValue('spaceUse', '');
  }, [formik.values.for]);

  useUpdateEffect(() => {
    onChange?.(formik.values);
  }, [formik.values]);

  return (
    <AppBar
      position="static"
      color="inherit"
      {...AppBarProps}
      sx={(theme) => ({
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 5px 7px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(3px)',
        zIndex: theme.zIndex.appBar - 1,
      })}
    >
      <Toolbar>
        <Stack direction="row" gap={2}>
          <PlaceField
            defaultValue={formik.initialValues.address}
            onChange={async (prediction) => {
              await formik.setFieldValue('address', prediction?.structured_formatting.main_text);
            }}
          />
          <SelectField
            value={formik.values.for}
            onChange={formik.handleChange('for')}
            size="small"
            sx={{
              minWidth: 142,
            }}
          >
            {[
              {
                key: 'For Lease',
                value: 'lease',
              },
              {
                key: 'For Sale',
                value: 'sale',
              },
            ].map(({ key, value }) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </SelectField>
          <SelectField
            value={formik.values.spaceUse}
            onChange={formik.handleChange('spaceUse')}
            size="small"
            sx={{
              minWidth: 142,
            }}
          >
            <MenuItem
              value=""
              sx={(theme) => ({
                color: theme.palette.text.disabled,
              })}
            >
              Space Use
            </MenuItem>
            {(formik.values.for === 'lease'
              ? [
                  {
                    key: 'Retail',
                    value: 'retail',
                  },
                  {
                    key: 'Restaurant',
                    value: 'restaurant',
                  },
                  {
                    key: 'Flex',
                    value: 'flex',
                  },
                  {
                    key: 'Office',
                    value: 'office',
                  },
                  {
                    key: 'Medical',
                    value: 'medical',
                  },
                ]
              : [
                  {
                    key: 'Retail',
                    value: 'retail',
                  },
                  {
                    key: 'Restaurant',
                    value: 'restaurant',
                  },
                  {
                    key: 'Office',
                    value: 'office',
                  },
                  {
                    key: 'Medical',
                    value: 'medical',
                  },
                  {
                    key: 'Shopping Center',
                    value: 'shopping-center',
                  },
                  {
                    key: 'Multifamily',
                    value: 'multifamily',
                  },
                  {
                    key: 'Hospitality',
                    value: 'hospitality',
                  },
                ]
            ).map(({ key, value }) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </SelectField>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default FiltersBar;