import React from 'react';
import { Container, Button } from 'reactstrap';
import { CLIENT_TEAM_NAME } from '../../utils/constants';
import Menu from './Menu';
import { useToggle } from '../../hooks/useToggle';
import AddPlace from './AddPlace';
import FindPlace from './FindPlace';
import LoadFile from './LoadFile'
import SaveFile from './SaveFile'
import Settings from './Settings';
import { IoMdClose } from 'react-icons/io';
import { useFetchTypeAndWhereData } from "./Find/FindPlaceHelper";

export default function Header(props) {
	const [showAddPlace, toggleAddPlace] = useToggle(false);
	const [showFindPlace, toggleFindPlace] = useToggle(false);
	const [showSettings, toggleSettings] = useToggle(false);
	const [showLoadFile, toggleLoadFile] = useToggle(false);
	const [showSaveFile, toggleSaveFile] = useToggle(false);
	const [typeOptions, whereOptions] = useFetchTypeAndWhereData();

	const toggles = {
		toggleAddPlace, toggleFindPlace, toggleSettings, toggleLoadFile, toggleSaveFile, toggleAbout: props.toggleAbout,
	}

	const shows = {
		showAddPlace, showFindPlace, showSettings, showLoadFile, showSaveFile, showAbout: props.showAbout
	}

	const options = {
		typeOptions, whereOptions
	}

	return (
		<React.Fragment>
			<HeaderContents
				{...toggles}
				{...props}
			/>
			<AppModals
				{...shows}
				{...toggles}
				{...options}
				{...props}
			/>
		</React.Fragment>
	);
}

function HeaderContents(props) {
	return (
		<div className='full-width header vertical-center'>
			<Container>
				<div className='header-container'>
					<h1
						className='tco-text-upper header-title'
						data-testid='header-title'
					>
						{CLIENT_TEAM_NAME}
					</h1>
					<HeaderButton {...props} />
				</div>
			</Container>
		</div>
	);
}

function HeaderButton(props) {
	return props.showAbout ? (
		<Button
			data-testid='close-about-button'
			color='primary'
			onClick={() => props.toggleAbout()}
		>
			<IoMdClose size={32} />
		</Button>
	) : (
		<Menu {...props}/>
	);
}

function AppModals(props) {
	return (
		<>
			<AddPlace
				{...props}
			/>
			<FindPlace
				{...props}
			/>
			<Settings
				{...props}
			/>
			<LoadFile
				{...props}
			/>
			<SaveFile
				{...props}
			/>
		</>
	);
}
