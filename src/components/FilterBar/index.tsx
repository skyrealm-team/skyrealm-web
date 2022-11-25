import { FC } from 'react';
import { AppBar, TextField, Toolbar, Stack, MenuItem, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useUpdateEffect } from 'react-use';
import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

const FilterBar: FC = () => {
  const formik = useFormik<{
    address: string;
    for: 'lease' | 'sale';
    spaceUse: string;
  }>({
    initialValues: {
      address: '',
      for: 'lease',
      spaceUse: '',
    },
    onSubmit: () => {},
  });

  useUpdateEffect(() => {
    formik.setFieldValue('spaceUse', '');
  }, [formik.values.for]);

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={(theme) => ({
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 5px 7px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(3px)',
        zIndex: 2,
      })}
    >
      <Toolbar>
        <Stack direction="row" gap={2}>
          <TextField
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Input Address"
            color="primary"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 323,
            }}
          />
          <TextField
            name="for"
            value={formik.values.for}
            onChange={formik.handleChange}
            size="small"
            select
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
          </TextField>
          <TextField
            name="spaceUse"
            value={formik.values.spaceUse}
            onChange={formik.handleChange}
            size="small"
            select
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
              <em>Space Use</em>
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
          </TextField>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default FilterBar;
