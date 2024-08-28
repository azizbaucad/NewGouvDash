const hexToRgba = require('hex-to-rgba');
const {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsExclamationTriangleFill,
  BsMegaphoneFill,
} = require('react-icons/bs');

module.exports = {
  name: 'Hightlight status',
  themeHightlightStatus: {
    realizes: {
      name: 'realizes',
      style: {
        iconColor: '#32c832',
        bgColor: hexToRgba('#32c832', 0.05),
      },
      icon: <BsFillHandThumbsUpFill />,
      label: 'Réalisés',
    },
    difficults: {
      name: 'difficults',
      style: {
        iconColor: '#cd3c14',
        bgColor: hexToRgba('#cd3c14', 0.05),
      },
      icon: <BsFillHandThumbsDownFill />,
      label: 'Difficultés',
    },
    challenges: {
      name: 'challenges',
      style: {
        iconColor: '#ffb400',
        bgColor: hexToRgba('#ffb400', 0.05),
      },
      icon: <BsExclamationTriangleFill />,
      label: 'Enjeux',
    },
    coordinationPoint: {
      name: 'coordinationPoint',
      style: {
        iconColor: '#4285f4',
        bgColor: hexToRgba('#4285f4', 0.05),
      },
      icon: <BsMegaphoneFill />,
      label: 'En cours',
    },
    pointOfAttention: {
      name: 'pointOfAttention',
      style: {
        iconColor: '#b58b77',
        bgColor: hexToRgba('#b58b77', 0.05),
      },
      icon: <BsMegaphoneFill />,
      label: "Point d'attention",
    },
    challengeInProgress: {
      name: 'challengeInProgress',
      style: {
        iconColor: '#6c86a3',
        bgColor: hexToRgba('#6c86a3', 0.05),
      },
      icon: <BsMegaphoneFill />,
      label: 'Challenge en cours',
    },
  },
};
