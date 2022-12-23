import { FC, useMemo } from "react";
import { useToggle } from "react-use";

import { LocationOn } from "@mui/icons-material";
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from "@mui/material";

import parse from "autosuggest-highlight/parse";

import LocationSearchingIcon from "assets/icons/location-searching.svg";
import SearchIcon from "assets/icons/search.svg";
import useEffectState from "hooks/useEffectState";
import usePlacePredictions from "hooks/usePlacePredictions";

export type PlaceFieldProps = {
  value?: string;
  onChange?: (
    value: string,
    prediction?: google.maps.places.AutocompletePrediction
  ) => void;
  onResult?: (detail: google.maps.places.PlaceResult) => void;
  TextFieldProps?: TextFieldProps;
};
const PlaceField: FC<PlaceFieldProps> = ({
  value,
  onChange,
  onResult,
  TextFieldProps,
}) => {
  const PlacesService = useMemo(
    () => new google.maps.places.PlacesService(document.createElement("div")),
    []
  );

  const [open, setOpen] = useToggle(false);
  const [inputValue, setInputValue] = useEffectState(value);

  const { data: placePredictions, isLoading } = usePlacePredictions({
    input: inputValue ?? "",
  });

  return (
    <Autocomplete<google.maps.places.AutocompletePrediction>
      getOptionLabel={(option) => {
        return option.structured_formatting.main_text;
      }}
      options={placePredictions ?? []}
      loading={isLoading}
      isOptionEqualToValue={(option, prediction) => {
        return option.place_id === prediction.place_id;
      }}
      includeInputInList={false}
      autoComplete
      sx={(theme) => ({
        width: 323,
        ":hover": {
          fieldset: {
            borderColor: `${theme.palette.border?.main} !important`,
          },
        },
        "&.Mui-focused": {
          fieldset: {
            borderColor: `${theme.palette.border?.main} !important`,
          },
        },
        ".MuiOutlinedInput-root": {
          px: "14px !important",
        },
        ...(open && {
          fieldset: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }),
      })}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={inputValue ?? ""}
      onInputChange={(event, input, reason) => {
        if (reason !== "reset") {
          setInputValue(input);
        }
      }}
      renderInput={(params) => (
        <TextField
          placeholder="City, Neighborhood, ZIP"
          color="primary"
          {...params}
          size="small"
          {...TextFieldProps}
          InputProps={{
            ...params.InputProps,
            sx: {
              ...(TextFieldProps?.size === "small" && {
                py: "0 7.5px !important",
              }),
            },
            startAdornment: (
              <InputAdornment position="start">
                <LocationSearchingIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <MenuItem
            key={option.place_id}
            {...props}
            value={option.structured_formatting.main_text}
            onClick={(event) => {
              props.onClick?.(event);

              onChange?.(inputValue ?? "", option);

              PlacesService.getDetails(
                {
                  placeId: option.place_id,
                },
                async (result) => {
                  if (!result) {
                    return;
                  }

                  onResult?.(result);
                }
              );
            }}
          >
            <ListItemIcon>
              <LocationOn fontSize="small" />
            </ListItemIcon>
            <Stack
              sx={{
                flex: 1,
                overflow: "hidden",
              }}
            >
              <Tooltip
                title={option.structured_formatting.main_text}
                placement="right"
                arrow
              >
                <Typography noWrap>
                  {parts.map((part, index) => (
                    <Typography
                      key={index}
                      component="span"
                      sx={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </Typography>
                  ))}
                </Typography>
              </Tooltip>
              <Tooltip
                title={option.structured_formatting.secondary_text}
                placement="right"
                arrow
              >
                <Typography variant="body2" color="text.secondary" noWrap>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Tooltip>
            </Stack>
          </MenuItem>
        );
      }}
      componentsProps={{
        popper: {
          placement: "bottom",
        },
        paper: {
          sx: (theme) => ({
            border: `2px solid ${theme.palette.border?.main}`,
            borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px) !important",
          }),
        },
      }}
    />
  );
};

export default PlaceField;
