import React, { FC, useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDebounce, useList, useToggle } from 'react-use';
import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

const AutocompleteService = new google.maps.places.AutocompleteService();

export type AutocompleteTextFieldProps = {
  defaultValue?: string;
  onChange?: (prediction?: google.maps.places.AutocompletePrediction) => void;
};
const AutocompleteTextField: FC<AutocompleteTextFieldProps> = ({ defaultValue, onChange }) => {
  const [open, setOpen] = useToggle(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [loading, setLoading] = useToggle(false);
  const [placePredictions, setPlacePredictions] = useList<google.maps.places.AutocompletePrediction>([]);

  useDebounce(
    async () => {
      if (!inputValue) {
        return;
      }

      setLoading(true);

      try {
        const response = await AutocompleteService.getPlacePredictions({
          input: inputValue,
          language: 'en',
        });
        setPlacePredictions.set(response.predictions);
      } finally {
        setLoading(false);
      }
    },
    200,
    [inputValue],
  );

  return (
    <Autocomplete<google.maps.places.AutocompletePrediction>
      getOptionLabel={(option) => {
        return option.structured_formatting.main_text;
      }}
      options={placePredictions}
      loading={loading}
      isOptionEqualToValue={(option, prediction) => {
        return option.place_id === prediction.place_id;
      }}
      autoComplete
      sx={{
        width: 323,
        '.MuiOutlinedInput-root': {
          py: '0 !important',
          px: '14px !important',
        },
        '.MuiAutocomplete-input': {
          py: '13.5px !important',
          px: '0 !important',
        },
        ...(open && {
          fieldset: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }),
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={async (event, prediction) => {
        onChange?.(prediction ?? undefined);

        if (!prediction) {
          return;
        }

        const headers = new Headers({
          'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
        });

        const placeTypes = [
          {
            place_type: 'POSTAL_CODE',
          },
          {
            place_type: 'ADMINISTRATIVE_AREA_LEVEL_1',
          },
          {
            place_type: 'ADMINISTRATIVE_AREA_LEVEL_2',
          },
          {
            place_type: 'ADMINISTRATIVE_AREA_LEVEL_3',
          },
          {
            place_type: 'ADMINISTRATIVE_AREA_LEVEL_4',
          },
          {
            place_type: 'LOCALITY',
          },
          {
            place_type: 'SUBLOCALITY_LEVEL_1',
          },
          {
            place_type: 'NEIGHBORHOOD',
          },
          {
            place_type: 'COUNTRY',
          },
        ];

        const response = await fetch('https://regionlookup.googleapis.com/v1alpha:searchRegion', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            search_values: placeTypes.map((item) => ({
              place_id: prediction?.place_id,
              ...item,
            })),
          }),
        });

        const result = await response.json();

        console.log(
          placeTypes.map((item, index) => ({
            ...item,
            matchedPlaceId: result.matches[index].matchedPlaceId,
          })),
        );
      }}
      inputValue={inputValue}
      onInputChange={(event, input, reason) => {
        if (!(reason === 'reset' && !input)) {
          setInputValue(input);
        }
      }}
      renderInput={(params) => (
        <TextField
          placeholder="Input Address"
          color="primary"
          {...params}
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {loading ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          key={option.structured_formatting.main_text}
          value={option.structured_formatting.main_text}
        >
          <Tooltip title={option.structured_formatting.main_text} placement="right" arrow>
            <Typography noWrap>{option.structured_formatting.main_text}</Typography>
          </Tooltip>
        </MenuItem>
      )}
      componentsProps={{
        popper: {
          placement: 'bottom',
        },
        paper: {
          sx: (theme) => ({
            border: `2px solid ${theme.palette.border?.main}`,
            borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px) !important',
          }),
        },
      }}
    />
  );
};

export default AutocompleteTextField;
