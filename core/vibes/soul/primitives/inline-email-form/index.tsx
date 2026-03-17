'use client';

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { FieldError } from '@/vibes/soul/form/field-error';
import { FormStatus } from '@/vibes/soul/form/form-status';
import { Button } from '../custom/button/button';

import { schema } from './schema';

type Action<State, Payload> = (
  prevState: Awaited<State>,
  formData: Payload,
) => State | Promise<State>;

export function InlineEmailForm({
  className,
  action,
  submitLabel = 'Submit',
  placeholder = 'Enter your email',
}: {
  className?: string;
  placeholder?: string;
  submitLabel?: string;
  action: Action<{ lastResult: SubmissionResult | null; successMessage?: string }, FormData>;
}) {
  const t = useTranslations('Components.Subscribe');
  const subscribeSchema = schema({
    requiredMessage: t('Errors.emailRequired'),
    invalidMessage: t('Errors.invalidEmail'),
  });

  const [{ lastResult, successMessage }, formAction, isPending] = useActionState(action, {
    lastResult: null,
  });

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: subscribeSchema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  });

  return (
    <form {...getFormProps(form)} action={formAction} className={clsx('space-y-2', className)}>
      <div
        className={clsx(
          'relative !rounded-[99px] border bg-background text-base transition-colors duration-200 overflow-hidden',
          form.errors?.length || fields.email.errors?.length
            // ? 'border-error focus-within:border-error'
            // : 'border-black focus-within:border-primary',
        )}
      >
        <input
          {...getInputProps(fields.email, { type: 'email' })}
          className="placeholder-contrast-gray-500 h-14 w-full bg-transparent pl-5 pr-16 text-foreground placeholder:font-normal focus:outline-none overflow-hidden border-none border-[0px]"
          data-1p-ignore
          key={fields.email.id}
          placeholder={placeholder}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden">
          {/* <Button
            aria-label={submitLabel}
            loading={isPending}
            shape="circle"
            size="small"
            type="submit"
            variant="secondary"
            className='text-[14px] px-[20px] bg-[#E7131A] border-none !text-[#fff]'
          > */}
            {/* <ArrowRight size={20} strokeWidth={1.5} /> */}
            {/* custom button */}
            <Button
              aria-label={submitLabel}
              loading={isPending}
              type="submit"
              className='bg-[#E7131A] text-[#fff] font-[600] text-[14px] h-[3.5rem] px-[40px]'
              >
              Subscribe
            </Button>
          {/* </Button> */}
        </div>
      </div>
      {fields.email.errors?.map((error) => (
        <FieldError key={error}>{error}</FieldError>
      ))}
      {form.errors?.map((error, index) => (
        <FormStatus key={index} type="error">
          {error}
        </FormStatus>
      ))}
      {form.status === 'success' && successMessage != null && (
        <FormStatus>{successMessage}</FormStatus>
      )}
    </form>
  );
}
