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

    jwtUser: Object,

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
    componentDidMount() { }

    /**
     * Stop polling for speaker stats updates.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() { }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // const userIds = Object.keys(this.state.stats);
        // const items = userIds.map(userId => this._createStatsItem(userId));
        const { jwtUser } = this.props;

        console.log("jwtUser", jwtUser);

        let template = '';

        if (jwtUser && jwtUser.id) {
            template = (
                <div className="qr-code" style={{ textAlign: 'center' }}>
                    <QRCode
                        value={`ordertick:${jwtUser.id}`}
                        size={400}
                        includeMargin={true}
                    />
                </div>
            );
        } else {
            template = <h1 style={{ 'textAlign': 'center', color: "#ffffff" }}>Meeting ID not found</h1>;
        }

        // if (!jwtUser || !jwtUser.id) {
        //     template = (<h1 className={{ 'textAlign': 'center' }}>Meeting ID not found</h1>);
        // } else {
        //     template = (
        //         <div className="qr-code" style={{ textAlign: 'center' }}>
        //             <QRCode
        //                 value={`ordertick:${jwtUser.id}`}
        //                 size={400}
        //                 includeMargin={true}
        //             />
        //         </div>
        //     );
        // }

        // return (

        //     <Dialog
        //         cancelKey={"dialog.close"}
        //         submitDisabled={true}
        //         titleKey="QR Code"
        //     >
        //         {template}
        //     </Dialog>
        // );

        return (

            <Dialog
                cancelKey={"dialog.close"}
                submitDisabled={true}
                titleKey="QR Code"
            >
                {template}
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

    const jwtUser = state['features/base/jwt'].isGuest ? undefined : state['features/base/jwt'].user;

    console.log("localParticipant", localParticipant);

    return {
        /**
         * The local display name.
         *
         * @private
         * @type {string|undefined}
         */
        _localDisplayName: localParticipant && localParticipant.name,

        jwtUser,

        participant: localParticipant,
    };
}

export default translate(connect(_mapStateToProps)(QrCode));
