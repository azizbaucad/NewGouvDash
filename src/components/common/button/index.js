import { Button } from '@chakra-ui/button';
import { routes } from '@theme';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const IconedButton = ({
  onClick,
  colorScheme,
  bgColor,
  color,
  message,
  variant,
  pl,
  justifyContent,
  borderWidth,
  rightIcon,
  leftIcon,
  w,
}) => {
  return (
    <Button
      _hover={{}}
      {...{
        rightIcon,
        leftIcon,
        borderWidth,
        pl,
        justifyContent,
        variant,
        onClick,
        colorScheme,
        bgColor,
        color,
        w,
      }}
      {...(!rightIcon &&
        !leftIcon && { rightIcon: <FiArrowRight size={'1.5rem'} /> })}
    >
      {message}
    </Button>
  );
};

export const SocialButton = ({
  onClick,
  colorScheme,
  bgColor,
  color,
  message,
  icon,
  variant,
  pl,
  size,
  justifyContent,
}) => {
  return (
    <Button
      leftIcon={icon || <FiArrowLeft size={'1.5rem'} />}
      {...{
        pl,
        justifyContent,
        variant,
        onClick,
        colorScheme,
        bgColor,
        color,
        size,
      }}
      fontSize={'1rem'}
      h={'1.5rem'}
    >
      {message}
    </Button>
  );
};

export const BackToHome = () => {
  const router = useRouter();
  return (
    <Button
      leftIcon={<FiArrowLeft size={'1.5rem'} />}
      colorScheme={'transparent'}
      variant={'ghost'}
      fontSize={'1rem'}
      h={'1.5rem'}
      pl={0}
      onClick={() => router.push(routes.page_route.initial)}
    >
      {"Retour vers l'accueil du portail"}
    </Button>
  );
};

export const ButtonBack = ({ message, color }) => {
  const router = useRouter();
  return (
    <Button
      leftIcon={<FiArrowLeft size={'1.5rem'} />}
      colorScheme={'transparent'}
      variant={'ghost'}
      fontSize={'1rem'}
      {...{
        color,
      }}
      onClick={() => router.back()}
    >
      {message}
    </Button>
  );
};
