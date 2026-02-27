import ContainerLayout from "../../components/Assets/ContainerLayout";
import Paper from "../../components/Assets/Paper";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import TextField from "../../components/Form/TextField";
import useAdminLogin, { AdminLoginVariables } from "../../hooks/useAdminLogin";
import LoadingButton from "../../components/Assets/LoadingButton";

export default function AdminLogin() {
  const form = useForm();
  const { isPending, mutate } = useAdminLogin();
  const handleSubmit = (values: FieldValues) => {
    mutate(values as AdminLoginVariables);
  };

  return (
    <ContainerLayout className="h-screen justify-center items-center flex">
      <Paper className="max-w-sm w-full mx-auto">
        <h2 className="text-center text-hgray-500 font-semibold text-lg my-3">
          ورود به پنل مدیریت
        </h2>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <TextField required name="phone" label="نام کاربری" />

            <TextField
              type="password"
              name="password"
              label="رمز عبور"
              required
            />

            <LoadingButton loading={isPending} fullWidth type="submit">
              ورود
            </LoadingButton>
          </form>
        </FormProvider>
      </Paper>
    </ContainerLayout>
  );
}
