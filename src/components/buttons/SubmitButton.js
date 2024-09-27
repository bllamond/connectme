import React from 'react'
import {useFormStatus} from 'react-dom';
const SubmitButton = ({children , }) => {
    const {pending} = useFormStatus();
  return (
    <button
          disabled={pending}
          className="bg-blue-500 disabled:bg-blue-400 disabled:text-gray-200 flex gap-2 items-center justify-center text-white py-2 px-4 w-full mx-auto"
          type="submit"
        >
          {pending && (<span>Saving...</span>)}
          {!pending && children}
        </button>
  )
}

export default SubmitButton