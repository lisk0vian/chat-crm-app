import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTestConnection } from "@/hooks/use-test-connection";
import { useWhatsAppConfig } from "@/hooks/use-whatsapp-config";
import {
  isApiVersion,
  versions as WHATSAPP_API_VERSIONS,
  type WhatsAppConfig as WhatsAppConfigSchema,
} from "@/schemas/whatsapp-config.schema";
import { useAuthStore } from "@/stores/auth-store";
import { type WhatsAppConfigFormValues } from "@/types/whatsapp.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";

const onInvalidSubmit = (errors: FieldErrors<WhatsAppConfigFormValues>) => {
  Object.values(errors).forEach((error) => {
    if (error?.message) toast.error(error.message);
  });
};

// Component
export const WhatsappView = () => {
  const user = useAuthStore().auth.user;
  const businessId = user?.businessId ?? "";
  const { form, onSubmit, isSaving, isLoading } = useWhatsAppConfig(
    user?.businessId
  );
  const { mutate } = useTestConnection();

  return isLoading ? (
    <div className="flex justify-center items-center h-8/10">
      <Loader2Icon className="h-max w-6 animate-spin text-muted-foreground" />
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
        className="space-y-6 flex flex-col justify-between h-8/10"
      >
        <div className="flex flex-col gap-5">
          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información de la cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputForm
                form={form}
                name="businessId"
                label="Business Account ID"
                placeholder="ID de la cuenta de negocio"
              />

              <InputForm
                form={form}
                name="phoneNumberId"
                label="Phone Number ID"
                placeholder="ID del número de Whatsapp"
              />

              <FormField
                control={form.control}
                name="apiVersion"
                render={({ field }) => {
                  const handleSelectChange = (val?: string) => {
                    if (!isApiVersion(val)) return;
                    field.onChange(val);
                  };

                  return (
                    <FormItem>
                      <FormLabel>Versión de API</FormLabel>
                      <Select
                        onValueChange={handleSelectChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar versión" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WHATSAPP_API_VERSIONS.map((version) => (
                            <SelectItem key={version} value={version}>
                              {version}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tokens de acceso</h3>
            <div className="space-y-4">
              <InputForm
                form={form}
                name="accessToken"
                label="Access Token"
                placeholder="Token de acceso de Meta"
                secret={true}
              />

              <InputForm
                form={form}
                name="verifyToken"
                label="Verify Token"
                placeholder="Token de verificación de Meta"
                secret={true}
              />
            </div>
          </div>

          {/* Webhook Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuración de Webhook</h3>
            <InputForm
              form={form}
              name="webhookUrl"
              label="Webhook URL"
              placeholder="https://tu-dominio.com/whatsapp/webhook"
            />
          </div>
        </div>

        {/* Buttons Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={() => mutate(businessId)}
            // disabled={loading}
            style={{ padding: "0.5rem 1rem" }}
          >
            Test
          </Button>
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const InputForm = ({
  form,
  name,
  label,
  placeholder,
  secret = false,
  readOnly = false,
}: {
  form: UseFormReturn;
  name: keyof WhatsAppConfigSchema;
  label: string;
  placeholder: string;
  secret?: boolean;
  readOnly?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={secret ? "password" : "text"}
              placeholder={placeholder}
              readOnly={readOnly}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
