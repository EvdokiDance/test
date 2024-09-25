import React, { MutableRefObject, useEffect, useRef } from 'react'
import { printOrDownloadDoc } from '../../utils'
import { CButton } from '@coreui/react-pro'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  documentRef: React.MutableRefObject<HTMLElement>
  hiddenSelectorEl?: string
  loading?: boolean
}

const DocumentActions: React.FC<Props> = ({
  className,
  documentRef,
  hiddenSelectorEl,
  loading,
  ...props
}) => {
  const hiddenElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (hiddenSelectorEl) {
      hiddenElementRef.current = document.querySelector(hiddenSelectorEl)
    }
  }, [])

  const handlePrintOrDownload = async (print = false) => {
    if (hiddenElementRef.current) {
      hiddenElementRef.current!.style.display = 'block'
      documentRef.current.appendChild(hiddenElementRef.current!)
      await printOrDownloadDoc(documentRef, print)
      hiddenElementRef.current!.style.display = 'none'
      return
    }

    await printOrDownloadDoc(documentRef, print)
  }

  return (
    <div
      data-html2canvas-ignore="true"
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'end',
        gap: '10px',
      }}
    >
      <CButton
        disabled={loading}
        onClick={() => handlePrintOrDownload(true)}
        color="primary"
        style={{
          minWidth: '150px',
          backgroundColor: '#747DEA',
        }}
      >
        Печать
      </CButton>
      <CButton
        disabled={loading}
        onClick={() => handlePrintOrDownload(false)}
        color="primary"
        style={{
          minWidth: '150px',
          backgroundColor: '#747DEA',
        }}
      >
        Скачать
      </CButton>
    </div>
  )
}

export default DocumentActions
