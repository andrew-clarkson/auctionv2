'use client';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

export default function AddItem() {
  const router = useRouter();
  const initialValues = {
    title: '',
    description: '',
    price: '',
    photoUrl: '',
  };

  // does yup protect from sql injection?
  // also https://www.npmjs.com/package/common-tags

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(7, 'Must be at least 7 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    description: Yup.string()
      .min(25, 'Must be at least 25 characters')
      .max(500, 'Must be less than 500 characters')
      .required('Required'),
    price: Yup.number().required('Required'),
    photoUrl: Yup.string()
      .required('Required')
      .matches(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        'That is not a valid URL'
      ),
  });

  return (
    <div>
      <h1>Add an Item</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // different onsubmit for add and edit
        onSubmit={async (values, { setSubmitting }) => {
          const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          // need error handling
          alert('submitted');
          router.push('/'); // this causes a refresh
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor='title'>Title</label>
            </div>
            <div>
              <input
                id='title'
                type='text'
                {...formik.getFieldProps('title')} //include name, onChange, onBlur, value
              />
              {formik.touched.title && formik.errors.title && (
                <div>{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label htmlFor='description'>Description</label>
            </div>
            <div>
              <textarea
                id='description'
                {...formik.getFieldProps('description')}
                rows={15}
              />
              {formik.touched.description && formik.errors.description && (
                <div>{formik.errors.description}</div>
              )}
            </div>

            <div>
              <label htmlFor='price'>Start Price</label>
            </div>
            <div>
              <input
                id='price'
                type='number'
                {...formik.getFieldProps('price')}
              />
              {formik.touched.price && formik.errors.price && (
                <div>{formik.errors.price}</div>
              )}
            </div>

            <div>
              <label htmlFor='photoUrl'>Photo URL</label>
            </div>
            <div>
              <input
                id='photoUrl'
                type='text'
                {...formik.getFieldProps('photoUrl')}
              />
              {formik.touched.photoUrl && formik.errors.photoUrl && (
                <div>{formik.errors.photoUrl}</div>
              )}
            </div>

            <button type='submit' disabled={formik.isSubmitting}>
              Add
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
