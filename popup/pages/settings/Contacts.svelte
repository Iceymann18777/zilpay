<script lang="ts">
	import { _ } from 'popup/i18n';
	import { push } from 'svelte-spa-router';

  import { trim } from 'popup/filters/trim';
  import { removeContact } from 'popup/backend/contacts';
  import { clipboardCopy } from 'lib/utils/clipboard';
	import { TokenType } from 'popup/config/token-type';

	import contactsStore from 'popup/store/contacts';

	import NavClose from '../../components/NavClose.svelte';
	import SearchBox from '../../components/SearchBox.svelte';
  import Modal from '../../components/Modal.svelte';
  import AddContactModal from '../../modals/AddContact.svelte';
	import DropDown from '../../components/DropDown.svelte';

	let search = '';
	let addContact = false;
	let dropDownList = [
		$_('contacts.items.rm'),
		$_('contacts.items.copy'),
	];

	$: contacts = $contactsStore.filter(
		(contact) => String(contact.name).toLowerCase().includes(String(search).toLowerCase())
	);

	const onInputSearch = (e) => {
		search = e.detail;
	};
	const onDropDown = async (event, contact) => {
		switch (event.detail) {
			case 0:
				const foundIndex = $contactsStore.findIndex((c) => contact.address === c.address);
				await removeContact(foundIndex);
				break;
			case 1:
				clipboardCopy(contact.address);
				break;
			default:
				break;
		}
	};
	const hanldeOnSelect = (address: String) => {
		push(`/send/${TokenType.ZRC2}/0/${address}`);
	};
</script>

<Modal
  show={addContact}
  title={$_('contacts.new_contact')}
  on:close={() => addContact = !addContact}
>
	<AddContactModal
		on:close={() => addContact = false}
	/>
</Modal>
<main>
	<NavClose title={$_('contacts.title')}/>
	<div>
		<SearchBox
			placeholder={$_('accounts.placeholder')}
			focus
			on:input={onInputSearch}
		/>
	</div>
	{#if contacts.length === 0}
		<p class="no-content">
			{$_('contacts.no_content')}
		</p>
	{/if}
	<ul>
		{#each contacts as contact, index}
			<li class:border={index !== contacts.length - 1}>
				<div
					class="text"
					on:click={() => hanldeOnSelect(contact.address)}
				>
					<b>
						{contact.name}
					</b>
					<p>
						{trim(contact.address)}
					</p>
				</div>
				<DropDown
					list={dropDownList}
					on:select={(e) => onDropDown(e, contact)}
				/>
			</li>
		{/each}
	</ul>
	<button
		class="primary"
		on:click={() => addContact = !addContact}
	>
		{$_('contacts.add_btn')}
	</button>
</main>

<style lang="scss">
	@import "../../styles/mixins";
	main {
		height: 100vh;
		background-color: var(--background-color);
		@include flex-center-top-column;
	}
	button {
		width: 290px;
		margin-block-end: 30px;
		margin-block-start: 30px;
	}
	p.no-content {
		text-align: left;
		width: 290px;
		text-indent: 10px;
		margin-block-start: 15px;
	}
	ul {
		padding: 0;
    margin: 0;
    overflow-y: scroll;
		margin-block-start: 16px;
		height: 100%;

		& > li {
			min-width: 280px;
			max-width: 380px;
			margin: 10px;
			text-indent: 10px;
			@include flex-between-row;
			&.border {
				border-bottom: solid 1px var(--muted-color);
			}
			& > div {
				cursor: pointer;
			}
			& > div.text {
				width: 100%;
				& > b {
					font-size: 16px;
					color: var(--text-color);
					font-family: Bold;
				}
				& > p {
					font-size: 13px;
				}
			}
		}
	}
</style>
