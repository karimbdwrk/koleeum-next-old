import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const resetForm = () => {
    const form = document.getElementById('EvaluationForm')
    const formContainer = document.querySelector('.evaluation-form')
    setTimeout(() => {
      form.querySelectorAll('input').forEach(element => element.value = '')
      form.querySelector('textarea').value = ''
      formContainer.innerHTML = '<div class="merci fadeIn"><h2>Merci.<br /><span>Nos équipes prendront contact avec vous dans les meilleurs délais</span></h2></div>'
    }, 500)
    console.log('resetForm')
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastname: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email:  yup.string()
        .email('invalid email')
        .required('Required'),
    telephone: yup.number().required('Required'),
    projet: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    objectif: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    localisation: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    budget: yup.number(),
    estimation: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    occupe: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    message: yup.string()
        .min(20, 'Too Short!')
        .max(500, 'Too Long!'),
})

const EvaluationForm = ({type}) => (
  <div className="evaluation-form">
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        telephone: '',
        objectif: undefined,
        projet: undefined,
        type: type,
        localisation: '',
        budget: '',
        estimation: undefined,
        occupe: undefined,
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        await sleep(500);
        console.log(JSON.stringify(values, null, 2));
        fetch('https://koleeum-admin.herokuapp.com/comptes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: values.name,
                lastname: values.lastname,
                email: values.email,
                telephone: values.telephone,
                objectif: values.objectif,
                projet: values.projet,
                type: type,
                localisation: values.localisation,
                budget: values.budget,
                estimation: values.estimation,
                occupe: values.occupe,
                message: values.message,
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data));

        console.log(setErrors)

        resetForm()
      }}
    >
      {({ errors,
          touched,
          isSubmitting,
          isValid,
      }) => (
        <Form id="EvaluationForm">
            {/* <Field id="evaluationType" name="type" placeholder="Mon prénom *" type="text">
                <option value="investissement">Investissement</option>
                <option value="vente">Vente</option>
                <option value="gestion_locative">Gestion Locative</option>
            </Field> */}
            <Field id="evaluationType" name="type" placeholder="Type *" type="text" value={type}/>
            <div className="my-informations">
                <div className="identity">
                    <div>
                        <Field name="lastname" placeholder="Mon nom *" type="text" />
                        {errors.lastname && touched.lastname ? <div className="error-message">{errors.lastname}</div> : null}
                    </div>
                    <div>
                        <Field name="name" placeholder="Mon prénom *" type="text" />
                        {errors.name && touched.name ? <div className="error-message">{errors.name}</div> : null}
                    </div>
                </div>
                <div className="contact">
                    <div>
                        <Field name="email" placeholder="Mon adresse email *" type="email" />
                        {errors.email && touched.email ? <div className="error-message">{errors.email}</div> : null}
                    </div>
                    <div>
                        <Field name="telephone" placeholder="Téléphone *" type="text" />
                        {errors.telephone && touched.telephone ? <div className="error-message">Veuillez entrer un numéro de téléphone valide</div> : null}
                    </div>
                </div>
            </div>
            <div className="my-options">
                <Field className="objectif" name="objectif" component="select">
                    <option>Quel est votre objectif ?</option>
                    <option value="residentiel">Acquérir ma première residence principale</option>
                    <option value="retraite">Preparer ma retraite</option>
                    <option value="rendement">Obtenir du rendement</option>
                    <option value="heritage">Transmettre à mes enfants</option>
                    <option value="fiscal">Optimiser ma fiscalité</option>
                    <option value="autre">Autre</option>
                </Field>
                <Field className="projet" name="projet" component="select">
                    <option>Quel est votre projet ?</option>
                    <option value="residentiel">Résidentiel</option>
                    <option value="commerce">Commerce</option>
                    <option value="bureaux">Bureaux</option>
                    <option value="autre">Autre</option>
                </Field>
                <Field name="localisation" component="select">
                    <option>Quel est la zone géographique ?</option>
                    <option value="paris">Paris</option>
                    <option value="ile_de_france">Ile de France</option>
                    <option value="region">Région</option>
                    <option value="etranger">Étranger</option>
                </Field>
            <div className="budget">
                <Field name="budget" placeholder="Budget *" type="text" />
                {errors.budget && touched.budget ? <div className="error-message">Veuillez entrer une somme en euro</div> : null}
            </div>
            </div>
            <div className="estimation">
                <Field name="estimation" component="select">
                    <option>Voulez-vous une estimation ?</option>
                    <option value="oui">Oui, je veux une estimation</option>
                    <option value="non">Non, je ne veux pas d'estimation</option>
                </Field>
            </div>
            <div className="occupe">
                <Field name="occupe" component="select">
                    <option>Votre bien est -il occupé ?</option>
                    <option value="oui">Oui, mon bien est occupé</option>
                    <option value="non">Non, mon bien n'est pas occupé</option>
                </Field>
            </div>
            <Field name="message" placeholder="Laisser un message" as="textarea" />
            {errors.message && touched.message ? <div className="error-message">{errors.message}</div> : null}
            <button className="btn" type="submit" disabled={isValid ? '' : 'disabled'}>{isValid ? 'Envoyer' : 'Corriger'}</button>
        </Form>
      )}
    </Formik>
  </div>
)

export default EvaluationForm 