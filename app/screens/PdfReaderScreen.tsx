import React from 'react'
import { PdfReaderScreenProps } from 'navigations/types'
import PDFReader from 'rn-pdf-reader-js'
import { SafeAreaView } from 'react-native-safe-area-context'

const PdfReaderScreen = (props: PdfReaderScreenProps): JSX.Element => {
    const { route: { params } } = props

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <PDFReader source={{ uri: params.file }} />
        </SafeAreaView>
    )
}

export default PdfReaderScreen
