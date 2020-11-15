import React from 'react'
import t from 't'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { importantSelected, screenshotSelected, removeSelected } from 'data/actions/bookmarks'

import { connectActionSheet } from '@expo/react-native-action-sheet'
import { Wrap } from './actions.style'
import Action from './action'

class SelectModeActions extends React.Component {
    getCountLabel = ()=>
        (this.props.all ? t.s('all').toLowerCase() : this.props.count + ' ' + t.s('selected')) + ' ' + t.s('bookmarks')

	onMove = ()=>
		this.props.navigation.navigate('bookmarks', {
			screen: 'move', 
			params: {
				spaceId: this.props.spaceId
			}
		})

	onTags = ()=>
		this.props.navigation.navigate('bookmarks', {
			screen: 'tag',
			params: {
				spaceId: this.props.spaceId
			}
		})

	onRemove = ()=>
		Alert.alert(`${t.s('remove')} ${this.getCountLabel()}?`, '',[
			{
                text: t.s('remove')+' '+this.getCountLabel(), 
                style: 'destructive', 
                onPress:()=>this.props.removeSelected(this.props.spaceId)},
			{
                text: t.s('cancel'), 
                style: 'cancel'
            }
        ])
        
    onMore = ()=>
        this.props.showActionSheetWithOptions(
            {
                title: this.getCountLabel(),
                options: [
                    t.s('clickToMakeScreenshot'),
                    t.s('add') + ' ' + t.s('to') + ' ' + t.s('favorites').toLowerCase(),
                    t.s('remove') + ' ' + t.s('from') + ' ' + t.s('favorites').toLowerCase(),

                    t.s('cancel')
                ],
                cancelButtonIndex: 3
            },
            buttonIndex => {
                switch(buttonIndex) {
                    case 0: return this.props.screenshotSelected(this.props.spaceId)
                    case 1: return this.props.importantSelected(this.props.spaceId)
                    case 2: return this.props.importantSelected(this.props.spaceId, false)
                }
            },
        )
    
    render() {
        const disabled = !this.props.all && !this.props.count

        return (
            <Wrap>
                <Action 
                    disabled={disabled}
                    icon='folder-transfer'
                    title={t.s('move')}
                    onPress={this.onMove} />

                <Action 
                    disabled={disabled}
                    icon='hashtag' 
                    title={t.s('addTags')}
                    onPress={this.onTags} />

                <Action 
                    disabled={disabled}
                    icon='delete-bin' 
                    title={t.s('remove')}
                    onPress={this.onRemove}/>

                <Action 
                    disabled={disabled}
                    icon='more'
                    title={t.s('more')}
                    onPress={this.onMore} />
            </Wrap>
        )
    }
}

export default connect(
    () => {
        const getSelectMode = makeSelectMode()

        return (state, { spaceId })=>{
            const selectMode = getSelectMode(state, spaceId)
    
            return {
                all: selectMode.all,
                count: selectMode.ids.length
            }
        }
    },
    { importantSelected, screenshotSelected, removeSelected }
)(
    connectActionSheet(
        SelectModeActions
    )
)