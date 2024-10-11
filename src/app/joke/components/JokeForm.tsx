import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { BlacklistFlags, LanguageOptions } from "@/types";
import { InputLabel } from "@mui/material";

// this type and the backend expectations could be the same
export type FormInputs = {
  blacklistFlags: BlacklistFlags[];
  lang: LanguageOptions;
  contains?: string;
};

interface JokeFormProps {
  onSubmit: (args: FormInputs) => void;
}

export function JokeForm({ onSubmit }: JokeFormProps) {
  const { handleSubmit, register } = useForm<FormInputs>({
    defaultValues: {
      blacklistFlags: [],
      lang: LanguageOptions.es,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Blacklist Flags</FormLabel>
          <FormGroup row={true}>
            {Object.values(BlacklistFlags).map((blacklistFlag) => (
              <FormControlLabel
                key={blacklistFlag}
                label={blacklistFlag}
                control={
                  <Checkbox
                    value={blacklistFlag}
                    {...register("blacklistFlags")}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl>
          <InputLabel id="select-language">Language</InputLabel>
          <Select
            labelId="select-language"
            label="Language"
            {...register("lang")}
          >
            <MenuItem value="">Select...</MenuItem>
            {Object.values(LanguageOptions).map((languageOption) => (
              <MenuItem key={languageOption} value={languageOption}>
                {languageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField label="Contains" {...register("contains")} />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
