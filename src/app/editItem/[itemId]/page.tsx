"use client";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';

export default function EditItem({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    price: '',
    photoUrl: '',
    id: ''
  });

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`/api/items/${params.itemId}`);
      const values = await res.json();
      setInitialValues(values)
      setLoading(false)
      console.log(values)
    }
    fetchItems();
  }, [params.itemId]);



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



  if (loading) return

  return (
    <div>
      <h1>Edit Item</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // different onsubmit for add and edit
        onSubmit={async (values, { setSubmitting }) => {
          const response = await fetch('/api/items', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          // need error handling
          alert('edited');
          router.push('/')
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
              <label htmlFor='price'>Current Price</label>
              {/* TODO: delete ability to change price afterauction start */}
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
              Edit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
