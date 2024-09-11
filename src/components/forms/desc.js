import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ButtonBack } from '@components/common/button';
import { FormInput, FormSubmit } from '@components/common/input/FormInput';
import { scroll_customize } from '@components/common/styleprops';
import { PageTitle } from '@components/common/title/page';
import { descSchema } from '@schemas';
import { forms, routes } from '@theme';
import { descFormHandler } from '@utils/handlers';
import { mapFormInitialValues } from '@utils/tools/mappers';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import { ProjectForm, PlanForm, ContactForm, InstitutionForm, StructureForm, ActiviteForm, EquipeForm, ProgrammeForm, DirectiveForm, ProjetForm, ActionForm } from './formSpecific';


export const DescActionForm = (props) => {
  return <ActionForm />;
}

export const DescProjetForm = (props) => {
  return <ProjetForm />;
}

export const DescPlanForm = (props) => {
  return <PlanForm />;
}

export const DescDirectiveForm = (props) => {
  return <DirectiveForm />;
}

export const DescProgrammeForm = (props) => {
  return <ProgrammeForm />;
}

export const DescForm = (props) => {
  return <ProjectForm />;
};

export const DescActiviteForm = (props) => {
  return <ActiviteForm />;
}

export const DescAccountForm = (props) => {
  return <ContactForm />;
}

export const DescEquipeForm = (props) => {
  return <EquipeForm />;
}

export const DescInstitutionForm = (props) => {
  return <InstitutionForm />;
}

export const DescStructureForm = (props) => {
  return <StructureForm />;
}

