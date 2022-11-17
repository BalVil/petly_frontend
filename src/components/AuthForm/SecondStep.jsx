import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import styles from './AuthForm.module.scss';

function SecondStep({ onNextStep, onPrevStep, formData }) {
  const validationSecondStepSchema = Yup.object({
    name: Yup.string().min(4, 'Name is too short').required('Required'),
    location: Yup.string().min(4, 'Location is too short').required('Required'),
    phone: Yup.string()
      .required('Required')
      .test('phone', 'Phone is not valid', value => {
        const valLengthWithoutDashes = value?.replace(/-|_/g, '').length;
        return valLengthWithoutDashes === 13;
      }),
  });

  const handleFormSubmit = values => {
    onNextStep(values, true);
  };

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSecondStepSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <Field
                className={styles.input}
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                render={msg => <div className={styles.errorMsg}>{msg}</div>}
              />
            </div>

            <div className={styles.formGroup}>
              <Field
                className={styles.input}
                name="location"
                type="text"
                placeholder="City, region"
              />
              <ErrorMessage
                name="location"
                render={msg => <div className={styles.errorMsg}>{msg}</div>}
              />
            </div>

            <div className={styles.formGroup}>
              <Field name="phone">
                {({ field }) => (
                  <InputMask
                    {...field}
                    className={styles.input}
                    mask="+380999999999"
                    id="phone"
                    placeholder="Mobile phone"
                  />
                )}
              </Field>

              <ErrorMessage
                name="phone"
                render={msg => <div className={styles.errorMsg}>{msg}</div>}
              />
            </div>

            <button className={styles.button} type="submit">
              Register
            </button>

            <button
              onClick={() => {
                onPrevStep(values);
              }}
              className={styles.button}
              type="button"
            >
              Back
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SecondStep;
