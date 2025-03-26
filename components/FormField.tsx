import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string; // default value applied
  type?: 'text' | 'email' | 'password' | 'file';
}

function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = '', // default placeholder set to empty string
  type = 'text',
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="input" type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  );
}

export default FormField;
