const { routes } = require('@theme');
const {
  AiFillShop,
  AiOutlineFileZip,
  AiOutlineDesktop,
  AiOutlineComment,
  AiFillBank,
  AiFillAppstore,
} = require('react-icons/ai');
const { BsPersonHeart } = require('react-icons/bs');
const { CgRowFirst } = require('react-icons/cg');
const { FaNetworkWired, FaMoneyCheck, FaSellsy } = require('react-icons/fa');
const { MdOutlineScreenSearchDesktop } = require('react-icons/md');
const { PiArrowsLeftRightBold } = require('react-icons/pi');
const { RiShakeHandsFill } = require('react-icons/ri');

module.exports = {
  name: 'Direction',
  themeDirection: {
    dmgp: {
      id: 3200,
      label: 'Primature',
      description: 'Dashboard Primature',
      icon: <AiFillShop fontSize={24} color="white" />,
    },
    ofms: {
      id: 3100,
      label: 'OFMS',
      description: 'Orange Finance Mobile Sénégal',
      icon: <PiArrowsLeftRightBold fontSize={24} color="white" />,
    },
    desc: {
      id: 3400,
      label: 'DESC',
      description: 'Direction Experience et Serivce Client',
      icon: <BsPersonHeart fontSize={24} color="white" />,
    },
    dv: {
      id: 3300,
      label: 'DV',
      description: 'Direction Vente',
      icon: <RiShakeHandsFill fontSize={24} color="white" />,
    },
    compte: {
      id: 3500,
      label: 'COMPTE',
      description: 'Direction Vente',
      icon: <RiShakeHandsFill fontSize={24} color="white" />,
    },
    dde: {
      id: 4300,
      label: 'DDE',
      description: 'Direction des Entreprises',
      icon: <AiFillBank color="white" />,
    },
    ddedmc: {
      id: 4301,
      label: 'DDE',
      description: 'Direction Marketing et communication - DMC',
      icon: <AiFillBank color="white" />,
    },
    ddeprc: {
      id: 4302,
      label: 'DDE',
      description: 'Pole Relation Clients - PRC',
      icon: <AiFillBank color="white" />,
    },
    digital: {
      id: 4400,
      label: 'DIGITAL',
      description: 'Indicateurs Digitaux',
      icon: <AiFillAppstore fontSize={24} color="white" />,
    },
    drj: {
      id: 3700,
      label: 'DRJ',
      description: 'Direction Juridique',
      icon: <AiOutlineFileZip fontSize={24} color="white" />,
    },
    dsi: {
      id: 4700,
      label: 'DSI',
      description: "Direction des systèmes d'information",
      icon: <AiOutlineDesktop fontSize={24} color="white" />,
    },
    drh: {
      id: 3500,
      label: 'DRH',
      description: 'Direction des ressources humaines',
      icon: <AiOutlineDesktop fontSize={24} color="white" />,
    },
    dcire: {
      id: 3800,
      label: 'DCIRE',
      description: 'Communication Institutionnel et Relations Extérieures',
      icon: <AiOutlineComment fontSize={24} color="white" />,
    },
    arq: {
      id: 3900,
      label: 'ARQ',
      description: 'Audit des Risques et de la Qualité',
      icon: <MdOutlineScreenSearchDesktop fontSize={24} color="white" />,
    },
    drps: {
      id: 4100,
      label: 'DRPS',
      description: 'Direction des Réseaux et des plateformes de services',
      icon: <FaNetworkWired fontSize={24} color="white" />,
    },
    dfc: {
      id: 4000,
      label: 'DFC',
      description: 'Direction financière et comptable',
      icon: <FaMoneyCheck fontSize={24} color="white" />,
    },

    dst: {
      id: 4200,
      label: 'DST',
      description: 'Direction des stratégies de transformations',
      icon: <CgRowFirst fontSize={24} color="white" />,
    },

    dal: {
      id: 4800,
      label: 'DAL',
      description: 'Direction achats et logistiques',
      icon: <FaSellsy fontSize={24} color="white" />,
    },
  },
};
