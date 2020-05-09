// @flow

import React, { Component } from "react";

import { Dialog } from "../../base/dialog";
import { translate } from "../../base/i18n";
import { getLocalParticipant } from "../../base/participants";
import { connect } from "../../base/redux";
import QRCode from 'qrcode.react';


declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of {@link SpeakerStats}.
 */
type Props = {
    /**
     * The display name for the local participant obtained from the redux store.
     */
    _localDisplayName: string,

    /**
     * The JitsiConference from which stats will be pulled.
     */
    participant: Object,

    /**
     * The function to translate human-readable text.
     */
    t: Function,
};

/**
 * The type of the React {@code Component} state of {@link SpeakerStats}.
 */
type State = {
    /**
     * The stats summary provided by the JitsiConference.
     */
};

/**
 * React component for displaying a list of speaker stats.
 *
 * @extends Component
 */
class QrCode extends Component<Props, State> {
    /**
     * Begin polling for speaker stats updates.
     *
     * @inheritdoc
     */
    componentDidMount() {}

    /**
     * Stop polling for speaker stats updates.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {}

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // const userIds = Object.keys(this.state.stats);
        // const items = userIds.map(userId => this._createStatsItem(userId));

        return (
            <Dialog
                cancelKey={"dialog.close"}
                submitDisabled={true}
                titleKey="QR Code"
            >
                <div className="qr-code" style={{ textAlign: 'center' }}>
                <QRCode
                    id="123456"
                    value="123456"
                    size={400}
                    level={"H"}
                    includeMargin={true}
                />
                </div>
            </Dialog>
        );
    }


}

/**
 * Maps (parts of) the redux state to the associated SpeakerStats's props.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _localDisplayName: ?string
 * }}
 */
function _mapStateToProps(state) {
    const localParticipant = getLocalParticipant(state);

    console.log("localParticipant", localParticipant);

    return {
        /**
         * The local display name.
         *
         * @private
         * @type {string|undefined}
         */
        _localDisplayName: localParticipant && localParticipant.name,

        participant: localParticipant,
    };
}

export default translate(connect(_mapStateToProps)(QrCode));
