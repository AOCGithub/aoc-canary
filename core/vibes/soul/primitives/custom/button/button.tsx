import { Loader2 } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    loading?: boolean;
}

export function Button({
    loading = false,
    type = 'button',
    disabled = false,
    className,
    children,
    ...props
    }: ButtonProps) {
    return (
        <button
        {...props}
        aria-busy={loading}
        className={className}
        disabled={disabled}
        type={type}
        >
        {!loading && (
            <span>{children}</span>
        )}

        {loading && (
            <span>
            <Loader2 className="animate-spin" />
            </span>
        )}
        </button>
    );
}