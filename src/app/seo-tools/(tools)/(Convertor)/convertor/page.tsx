'use client';

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { RiErrorWarningFill } from '@remixicon/react';
import { convertorFileTypes, ConvertorFileTypesData } from '../fileTypes';

const ConvertorPage = () => {

  const [fromType, setFromType] = useState<string | null>(null);
  const [toType, setToType] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fromType = searchParams.get('from');
    const toType = searchParams.get('to');
    setFromType(fromType)
    setToType(toType);
  }, []);


  if (!fromType || !toType) {
    return (
      <div
        className='flex items-center gap-2 bg-red-50 text-red-500 rounded-md py-2 px-4'
      >
        <RiErrorWarningFill
          size={20}
        />
        <p>Please select file types first</p>
      </div>
    )
  }

  // Validate fromType and toType
  function validateFromToTypes() {
    try {
      let fromTypeObject: ConvertorFileTypesData | null = null;
      for (const fileTypes of convertorFileTypes) {
        if (fileTypes.type === fromType) {
          fromTypeObject = fileTypes;
        }

        if (fromTypeObject) {
          break;
        }
      }

      if (!fromTypeObject) {
        return "Source file type is invalid!";
      }

      for (const destin of fromTypeObject.canConvertTo) {
        for (const type of destin.types) {
          if (type === toType) {
            return null;
          }
        }
      }

      return "Destination file type is invalid!";

    } catch (err) {
      return "Something went wrong!";
    }
  }

  if (validateFromToTypes()) {
    const error = validateFromToTypes();
    return (
      <div
        className='flex items-center gap-2 bg-red-50 text-red-500 rounded-md py-2 px-4'
      >
        <RiErrorWarningFill
          size={20}
        />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <p>Working...</p>
    </div>
  )
}

export default ConvertorPage