import { Stack, HStack, Link, Divider, Image, IconButton } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const links = ['Blog', 'Documentation', 'Terms of use', 'Privacy policy'];
const accounts = [
  {
    url: 'https://github.com/MA-Ahmad/templateskart',
    label: 'Github Account',
    type: 'gray',
    icon: <FaGithub />
  },
  {
    url: 'https://twitter.com/muhammad_ahmaad',
    label: 'Twitter Account',
    type: 'twitter',
    icon: <FaTwitter />
  }
];

const Footer = () => {
  return (
    <Stack
      maxW="5xl"
      marginInline="auto"
      p={8}
      spacing={{ base: 8, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
    >
      <Link href="https://templateskart.com" isExternal>
        <Image w="100px" src="/assets/images/layouts/hero_image.png" alt="EW" />
      </Link>

      {/* Desktop Screen */}
      <HStack spacing={4} alignItems="center" d={{ base: 'none', md: 'flex' }}>
        {links.map((link, index) => (
          <CustomLink key={index}>{link}</CustomLink>
        ))}
      </HStack>

      <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
        {accounts.map((sc, index) => (
          <IconButton
            key={index}
            as={Link}
            isExternal
            href={sc.url}
            aria-label={sc.label}
            colorScheme={sc.type}
            icon={sc.icon}
            rounded="md"
          />
        ))}
      </Stack>
    </Stack>
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;