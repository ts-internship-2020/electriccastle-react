import React, { useState, useCallback } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'components/common/inputs/CustomTextField';
import CustomIconButton from 'components/common/buttons/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { emptyString } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';
import { validateEmail } from 'utils/functions';

function Welcome() {
    const [email, setEmail] = useEmail()
    const [ textFieldValue, setTextFieldValue ] = useState(email)
    const { t } = useTranslation()
    const [isEmailValid, setIsEmailValid] = useState(true)

    const handleTextFieldValueChange = useCallback((event) => setTextFieldValue(event.target.value), [])

    const handleButtonClick = useCallback(() => {
        const isEmailValid = validateEmail(textFieldValue)
        setEmail(isEmailValid ? textFieldValue : emptyString)
        setIsEmailValid(isEmailValid)
    }, [setEmail, textFieldValue])

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            handleButtonClick()
        }
    }, [handleButtonClick])

    return (
        <Grid container spacing={10} direction="column" justify="center" alignItems="center" alignContent="center">
            <Grid item xs={4}>
                <Typography variant="h5">{t("LandingPage.Title")}</Typography>
            </Grid>
            <Grid item container spacing={1} direction="column" justify="center" alignItems="center" alignContent="center">
                <Grid item xs={4}>
                    <Typography variant="caption">{t("LandingPage.Subtitle")}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField 
                        fullWidth
                        endAdornment={(<CustomIconButton size="small" color="theme" onClick={handleButtonClick}>
                                        <KeyboardReturnIcon fontSize="small"/>
                                    </CustomIconButton>)}
                        debounceBy={0}
                        value={textFieldValue}
                        onChange={handleTextFieldValueChange}
                        onKeyDown={handleKeyDown}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? t("LandingPage.BadEmail") : ""}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Welcome;