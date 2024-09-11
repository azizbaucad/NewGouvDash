const hexToRgba = require('hex-to-rgba');
const {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsExclamationTriangleFill,
  BsMegaphoneFill,
} = require('react-icons/bs');
const {
  FcOk
} = require('react-icons/fc');
const {
  MdDoNotDisturbOn
} = require('react-icons/md');
module.exports = {
  name: 'Hightlight status',
  themeHightlightStatus: {
    realizes: {
      name: 'realizes',
      style: {
        statusColor:'#4caf50',
        bgColor: hexToRgba('#9999ff', 0.05),
      },
      icon: <FcOk size={24} />,
      label: 'Réalisés',
    },
    difficults: {
      name: 'difficults',
      style: {
        statusColor:'#cd3c14',
        bgColor: hexToRgba('#9999ff', 0.05),
      },
      icon: <MdDoNotDisturbOn color='#cd3c14' size={24} />,
      label: 'En attente',
    },
    challenges: {
      name: 'challenges',
      style: {
        statusColor:'#ffb400',
        bgColor: hexToRgba('#9999ff', 0.05),
      },
      icon: <BsExclamationTriangleFill color='#ffb400' size={24} />,
      label: 'Enjeux',
    },
    coordinationPoint: {
      name: 'coordinationPoint',
      style: {
        statusColor:'#4285f4',
        bgColor: hexToRgba('#4285f4', 0.05),
      },
      icon: <BsMegaphoneFill color='#4285f4' size={20} />,
      label: 'En cours',
    },
    pointOfAttention: {
      name: 'pointOfAttention',
      style: {
        iconColor: '#b58b77',
        bgColor: hexToRgba('#9999ff', 0.05),
      },
      icon: <BsMegaphoneFill />,
      label: "Point d'attention",
    },
    challengeInProgress: {
      name: 'challengeInProgress',
      style: {
        iconColor: '#6c86a3',
        bgColor: hexToRgba('#9999ff', 0.05),
      },
      icon: <BsMegaphoneFill />,
      label: 'Challenge en cours',
    },
  },
};
