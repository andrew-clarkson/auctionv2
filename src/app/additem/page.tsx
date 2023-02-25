"use client";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "@root/components/Button/Button";

export default function AddItem() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      auctioneer: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(7, "Must be at least 7 characters")
        .max(50, "Must be less than 50 characters")
        .required("Required"),
      description: Yup.string()
        .min(25, "Must be at least 25 characters")
        .max(500, "Must be less than 500 characters")
        .required("Required"),
      price: Yup.number().required("Required"),
      auctioneer: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h1>Add an Item</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
        </div>
        <div>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps("title")} //include name, onChange, onBlur, value
          />
          {formik.touched.title && formik.errors.title && (
            <div>{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea
            id="description"
            {...formik.getFieldProps("description")}
            rows={15}
          />
          {formik.touched.description && formik.errors.description && (
            <div>{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label htmlFor="price">Start Price</label>
        </div>
        <div>
          <input id="price" type="number" {...formik.getFieldProps("price")} />
          {formik.touched.price && formik.errors.price && (
            <div>{formik.errors.price}</div>
          )}
        </div>

        <div>
          <label htmlFor="auctioneer">Auctioneer</label>
        </div>
        <div>
          <input
            id="auctioneer"
            type="text"
            {...formik.getFieldProps("auctioneer")}
          />
          {formik.touched.auctioneer && formik.errors.auctioneer && (
            <div>{formik.errors.auctioneer}</div>
          )}
        </div>

        <Button buttonText="Add Item" color="green" type="submit" />
      </form>
    </div>
  );
}
