import { hightlightStatus } from '@theme';
import { object, string } from 'yup';

const {
  realizes,
  difficults,
  challenges,
  coordinationPoint,
  challengeInProgress,
  pointOfAttention,
} = hightlightStatus;

export const highlight = object({
  status: string().trim().required(),
  week: string().trim(),
  desc: string().trim(),
  title: string().trim(),
  submit: string().trim(),
  cancel: string().trim(),
});

export const highlightStatusStyle = (name) => {
  if (name == 'realizes') return realizes;
  if (name == 'difficults') return difficults;
  if (name == 'challenges') return challenges;
  if (name == 'coordinationPoint') return coordinationPoint;
  if (name == 'challengeInProgress') return challengeInProgress;
  if (name == 'pointOfAttention') return pointOfAttention;
};

export const DefaultHighlightstatus = [
  {
    name: realizes.label,
    icon: realizes.icon,
    iconColor: realizes.style.statusColor,
  },
  {
    name: difficults.label,
    icon: difficults.icon,
    iconColor: difficults.style.statusColor,
  },
  {
    name: challenges.label,
    icon: challenges.icon,
    iconColor: challenges.style.statusColor,
  },
  {
    name: coordinationPoint.label,
    icon: coordinationPoint.icon,
    iconColor: coordinationPoint.style.statusColor,
  },
];
