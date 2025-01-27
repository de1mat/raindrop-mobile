import t from 't'
import React from 'react'
import { LayoutAnimation } from 'react-native'
import { InputURL } from 'co/form'
import Goto from 'co/goto'

export default function BookmarkEditURL({ item: { link }, onChange, onSubmit, last }) {
    const [edit, setEdit] = React.useState(false)

    const onEditPress = React.useCallback(()=>{
        LayoutAnimation.easeInEaseOut()
        setEdit(true)
    }, [])

    const onChangeText = React.useCallback(link=>
        onChange({link}),
        [onChange]
    )

    const onBlur = React.useCallback(()=>{
        LayoutAnimation.easeInEaseOut()
        setEdit(false)
    }, [])

    if (!edit)
        return (
            <Goto
                last={last}
                icon='global'
                action=''
                label={link||'URL'}
                onPress={onEditPress} />
        )

    return (
        <InputURL 
            autoFocus
            last={last}
            value={link}
            placeholder={t.s('enterLinkDescription')}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            onBlur={onBlur} />
    )
}