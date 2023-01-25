import moment from "moment"

export const isDate = ( value, rest) => {

    if ( !value ){
        return false
    }

    const date = moment( value )

    return date.isValid() ? true : false

}