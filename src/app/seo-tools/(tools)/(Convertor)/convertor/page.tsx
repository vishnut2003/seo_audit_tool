'use client';

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { RiErrorWarningFill, RiLoader4Line } from '@remixicon/react';
import { convertorFileTypes, ConvertorFileTypesData } from '../fileTypes';
import { FileUploadTemplate } from '@/Components/SmallSEOTools/FileUploadTemplate';
import { convertFileTypeClientFunction } from './convertFunction';

const ConvertorPage = () => {

  const [fromType, setFromType] = useState<string | null>(null);
  const [toType, setToType] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);

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
    <div
      className='space-y-5'
    >
      {/* Image uploader */}
      <div>
        <FileUploadTemplate
          files={files}
          setError={setError}
          setFiles={setFiles}
          acceptedFiles={`.${fromType}`}
          noOfFiles={10}
          maxSize={5}
        />
      </div>
      {/* Show error if any */
        error &&
        <div
          className='flex items-center gap-2 bg-red-50 text-red-500 rounded-md py-2 px-4'
        >
          <RiErrorWarningFill
            size={20}
          />
          <p>{error}</p>
        </div>
      }
      <div
        className='flex justify-center items-center'
      >
        <button
          className='py-3 px-5 bg-themesecondary rounded-md font-semibold text-base text-white flex justify-center items-center gap-2'
          onClick={async () => {
            try {
              setInProgress(true);
              await convertFileTypeClientFunction({
                files,
                fromType,
                toType,
              })
              setInProgress(false);
            } catch (err) {
              setInProgress(false);
              if (typeof err === "string") {
                setError(err);
              } else if (err instanceof Error) {
                setError(err.message);
              } else {
                setError("Something went wrong!");
                console.log(err);
              }
            }
          }}
        >
          {
            inProgress &&
            <RiLoader4Line
              size={20}
              className='animate-spin'
            />
          }
          {inProgress ? "Converting..." : `Convert ${fromType} to ${toType}`}
        </button>
      </div>
    </div>
  )
}

export default ConvertorPage