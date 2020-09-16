import React from 'react'
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import qr from "assets/img/qr.jpg";
import { useTranslation } from "react-i18next";
import Typography from 'components/common/inputs/Typography';

const ConferenceCodeModal = ({ code }) => {
    const { t } = useTranslation();

    return <Grid container justify={"center"}>
        <Grid item>
            <img src={qr} alt="QR" />
        </Grid>
        <Grid item>
            <Typography>{t("Conferences.QRCodeMessage", { code })}</Typography>
        </Grid>
    </Grid>
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string.isRequired
}

export default ConferenceCodeModal;