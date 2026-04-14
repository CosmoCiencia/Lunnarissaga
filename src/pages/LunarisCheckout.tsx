import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Lunaris.module.css';

type FormValues = {
  fullName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type TouchedFields = Partial<Record<keyof FormValues, boolean>>;
type FeedbackState = {
  tone: 'error' | 'success' | null;
  message: string;
};

type FieldConfig = {
  id: keyof FormValues;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: 'text' | 'tel' | 'email';
  inputMode?: 'text' | 'tel' | 'email';
  wide?: boolean;
};

const WOMPI_CHECKOUT_URL = 'https://checkout.wompi.co/l/TU_LINK_AQUI';

const initialValues: FormValues = {
  fullName: '',
  address: '',
  city: '',
  phone: '',
  email: '',
};

const initialFeedback: FeedbackState = {
  tone: null,
  message: '',
};

const fieldConfigs: FieldConfig[] = [
  {
    id: 'fullName',
    label: 'Nombre completo',
    placeholder: 'Cómo quieres que figure la reserva',
    autoComplete: 'name',
    wide: true,
  },
  {
    id: 'address',
    label: 'Dirección',
    placeholder: 'Lugar exacto donde llegará la función',
    autoComplete: 'street-address',
    wide: true,
  },
  {
    id: 'city',
    label: 'Ciudad',
    placeholder: 'Ciudad de entrega',
    autoComplete: 'address-level2',
  },
  {
    id: 'phone',
    label: 'Celular',
    placeholder: 'Número de contacto',
    autoComplete: 'tel',
    type: 'tel',
    inputMode: 'tel',
  },
  {
    id: 'email',
    label: 'Correo electrónico',
    placeholder: 'Dónde confirmaremos tu pedido',
    autoComplete: 'email',
    type: 'email',
    inputMode: 'email',
    wide: true,
  },
] as const;

const markAllFieldsAsTouched = (): TouchedFields =>
  fieldConfigs.reduce<TouchedFields>((accumulator, field) => {
    accumulator[field.id] = true;
    return accumulator;
  }, {});

const validateField = (field: keyof FormValues, rawValue: string): string => {
  const value = rawValue.trim();

  if (!value) {
    return 'Este dato es obligatorio.';
  }

  switch (field) {
    case 'fullName':
      return value.length >= 6 ? '' : 'Escribe nombre y apellido.';
    case 'address':
      return value.length >= 8 ? '' : 'Agrega una dirección más completa.';
    case 'city':
      return value.length >= 3 ? '' : 'Indica una ciudad válida.';
    case 'phone':
      return value.replace(/\D/g, '').length >= 10 ? '' : 'Ingresa un celular válido.';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Escribe un correo electrónico válido.';
    default:
      return '';
  }
};

const validateValues = (values: FormValues): FormErrors =>
  fieldConfigs.reduce<FormErrors>((accumulator, field) => {
    const error = validateField(field.id, values[field.id]);

    if (error) {
      accumulator[field.id] = error;
    }

    return accumulator;
  }, {});

const isCheckoutConfigured = !WOMPI_CHECKOUT_URL.includes('TU_LINK_AQUI');

export default function LunarisCheckout() {
  const [pageReady, setPageReady] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback);

  const errors = validateValues(values);

  useEffect(() => {
    let cancelled = false;

    const revealPage = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) {
            setPageReady(true);
          }
        });
      });
    };

    const fontSet = document.fonts;
    if (!fontSet) {
      revealPage();
      return () => {
        cancelled = true;
      };
    }

    Promise.race([
      fontSet.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 2500)),
    ]).then(revealPage);

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldId = event.target.name as keyof FormValues;
    const nextValue = event.target.value;

    setValues((currentValues) => ({
      ...currentValues,
      [fieldId]: nextValue,
    }));

    if (feedback.tone) {
      setFeedback(initialFeedback);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const fieldId = event.target.name as keyof FormValues;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldId]: true,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitAttempted(true);
    setTouched(markAllFieldsAsTouched());

    if (Object.keys(errors).length > 0) {
      setFeedback({
        tone: 'error',
        message: 'Revisa los campos marcados antes de iniciar la función.',
      });
      return;
    }

    if (!isCheckoutConfigured) {
      setFeedback({
        tone: 'error',
        message:
          'El enlace de Wompi todavía está en modo placeholder. Reemplázalo antes de publicar esta compra.',
      });
      return;
    }

    setFeedback({
      tone: 'success',
      message: 'Redirigiendo al pago seguro de Wompi...',
    });

    window.location.assign(WOMPI_CHECKOUT_URL);
  };

  return (
    <div className={`${styles.root} ${pageReady ? styles.rootReady : styles.rootLoading}`}>
      <div className={styles.backdrop} />

      <main className={styles.shell}>
        <header className={styles.header}>
          <h1 className={`${styles.title} font-display`}>Completa tus datos</h1>
          <p className={`${styles.subtitle} ritual-text`}>
            Un último paso para confirmar la reserva y enviarte Lunnarïs hasta tu hogar.
          </p>
        </header>

        <section className={styles.formCard}>
          <div className={styles.checkoutSteps} aria-label="Progreso de la reserva">
            <span className={`${styles.checkoutStep} ${styles.checkoutStepDone}`}>
              Paso 1: Reserva
            </span>
            <span className={`${styles.checkoutStep} ${styles.checkoutStepCurrent}`}>
              Paso 2: Datos
            </span>
            <span className={styles.checkoutStep}>Paso 3: Pago</span>
          </div>

          <div className={styles.formIntro}>
            <h2 className={`${styles.formTitle} font-display`}>Datos de la función</h2>
            <p className={styles.formLead}>
              Necesitamos esta información para confirmar la compra, validar el pago y coordinar la
              entrega.
            </p>
          </div>

          <form className={styles.checkoutForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              {fieldConfigs.map((field) => {
                const inputId = `lunaris-checkout-${field.id}`;
                const showError = Boolean(errors[field.id]) && (submitAttempted || touched[field.id]);
                const fieldClassName = [
                  styles.field,
                  field.wide ? styles.fieldWide : '',
                  showError ? styles.fieldInvalid : values[field.id].trim() ? styles.fieldValid : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <label key={field.id} htmlFor={inputId} className={fieldClassName}>
                    <span className={`${styles.fieldLabel} font-display`}>{field.label}</span>
                    <input
                      id={inputId}
                      className={styles.fieldInput}
                      name={field.id}
                      type={field.type ?? 'text'}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      inputMode={field.inputMode}
                      value={values[field.id]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={showError}
                      aria-describedby={showError ? `${inputId}-error` : undefined}
                    />
                    <span
                      id={showError ? `${inputId}-error` : undefined}
                      className={showError ? styles.fieldMessageError : styles.fieldMessageHint}
                    >
                      {showError ? errors[field.id] : ' '}
                    </span>
                  </label>
                );
              })}
            </div>

            {feedback.tone ? (
              <p
                className={
                  feedback.tone === 'error' ? styles.formFeedbackError : styles.formFeedbackSuccess
                }
                role="status"
                aria-live="polite"
              >
                {feedback.message}
              </p>
            ) : null}

            <button type="submit" className={styles.payButton}>
              Activar la función
            </button>

            <p className={styles.secure}>Pago seguro con Wompi, PSE, tarjeta o Nequi.</p>
          </form>
        </section>

        <footer className={styles.footer}>
          <p className={styles.finalText}>La reserva ya casi está lista. Solo falta cerrar el pago.</p>

          <Link to="/lunaris" className={`${styles.backLink} font-display`}>
            Volver a la ofrenda
          </Link>
        </footer>
      </main>
    </div>
  );
}
