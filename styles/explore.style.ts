import { StyleSheet } from "react-native";
import {spacing} from './spacing'
import {colors} from './colors'
import { typography } from "./typography";


export const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: colors.background,
        marginTop:spacing.xs,

    },
    section:{
        backgroundColor:colors.lightAccent,
        marginTop:spacing.lg,
        borderTopWidth: 1,
        borderColor: colors.border,
        borderBottomWidth: 1,   
    },
    buttonLogout:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: spacing.sm,
        gap: spacing.xs,

    },
    logOutText:{
        ...typography.subtitle,
        color: colors.accent,

    },
    header:{
        backgroundColor: colors.background,
        padding: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems:'center',
        paddingVertical:spacing.lg,
    },
    email:{
        ...typography.subtitle
    },
    avatarPlaceholder: {
        width:96,
        height:96,
        borderRadius:48,
        backgroundColor:colors.accent,
        justifyContent:'center',
        alignItems:'center',
        

    },
    editBadge:{
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:colors.accent,
        width:28,
        height:28,
        borderRadius:spacing.sm,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:colors.lightAccent,

    

    },
    avatarContainer:{
        position:'relative',
        marginBottom:spacing.sm,
    
    },
    avatarImage:{
        width:96,
        height:96,
        borderRadius:48,

    }
        

});