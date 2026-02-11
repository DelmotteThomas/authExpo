import { StyleSheet } from "react-native";
import {spacing} from './spacing'
import {colors} from './colors'
import { typography } from "./typography";

export const styles = StyleSheet.create({
    container: {
        ...typography.small,
        flex:1,
        padding : spacing.sm,
        backgroundColor: colors.background,
    },
    content: {
        flex:1,
        justifyContent:'center',
        paddingHorizontal:24

    },
    title :{
        ...typography.title
    },

    subtitle : {
        ...typography.subtitle,
        marginBottom: spacing.md,
    
    },

    form : {
        gap: 16,
    },
    input : {
        backgroundColor : colors.background,
        borderRadius : spacing.sm ,
        padding : spacing.sm,
        borderWidth : 1,
        borderColor : colors.border,

    },
    button: {
        backgroundColor : colors.accent,
        borderRadius: spacing.sm,
        padding : spacing.sm,
        alignItems : 'center',
        marginTop:spacing.xs,

    },
    buttonText : {
        color: colors.lightAccent,
        ...typography.body,


    },
    footer : {
        flexDirection :'row',
        alignItems :'center',
        justifyContent : 'center',
        marginTop : spacing.md,
        gap:spacing.xs,


    },
    footerText : {
        color : colors.textMuted,
        ...typography.subtitle,

    },
    footerLink : {
        color : colors.accent,
        ...typography.subtitle,
    },
})