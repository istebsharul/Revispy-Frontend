// src/components/AuthForm.tsx
import React from 'react';

interface AuthFormProps {
  title: string;
  fields: { name: string; placeholder: string; type: string }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  linkText: string;
  linkUrl: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, fields, buttonText, onSubmit, linkText, linkUrl }) => (
  <div className="w-96 mx-auto p-8 border rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index}>
          <label className="block mb-1">{field.name}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        {buttonText}
      </button>
    </form>
    <p className="text-center mt-4">
      {linkText} <a href={linkUrl} className="font-semibold underline">LOGIN</a>
    </p>
  </div>
);

export default AuthForm;
