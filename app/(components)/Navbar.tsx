'use client';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1,
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		},
	},
}));

const links: { label: string; link: string }[] = [
	{ label: 'Home', link: '/#' },
	{
		label: 'FAQ',
		link: '/#faq',
	},
];

export function Navbar() {
	const [opened, { toggle, close }] = useDisclosure(false);
	const pathname = usePathname();
	const { classes, cx } = useStyles();
	let hash = '';

	if (typeof window !== 'undefined') {
		hash = window.location.hash;
	}

	const url = pathname! + hash;

	const items = links.map((link) => (
		<a
			className={cx(classes.link, { [classes.linkActive]: url === link.link })}
			href={link.link}
			key={link.label}
			onClick={close}
		>
			{link.label}
		</a>
	));

	return (
		<Header className={classes.root} height={HEADER_HEIGHT} mb={120}>
			<Container className={classes.header}>
				<Text>ACM LOGO</Text>
				<Group className={classes.links} spacing={5}>
					{items}
				</Group>

				<Burger className={classes.burger} onClick={toggle} opened={opened} size="sm" />

				<Transition duration={200} mounted={opened} transition="pop-top-right">
					{(styles) => (
						<Paper className={classes.dropdown} style={styles} withBorder>
							{items}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
}