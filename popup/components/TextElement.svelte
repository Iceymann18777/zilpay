<script lang="ts">
  import { viewIcon } from 'lib/block-explorer/view';

	import Arrow from './icons/Arrow.svelte';

  export let title = '';
  export let description = '';
</script>

<div class="card-btn">
  <slot />
  <div>
    <b>
      {title}
    </b>
    <p>
      {description}
    </p>
  </div>
  <Arrow />
</div>

<style lang="scss">
  @import "../styles/mixins";

  div.card-btn {
    background-color: var(--card-color);

    color: var(--text-color);
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    margin: 5px;
    border: solid 1px var(--card-color);

    min-width: 100px;
    max-width: 490px;
    width: inherit;

    @include flex-between-row;
    @include border-radius(8px);

    & > div {
      width: 100%;
    }

    &:hover {
      border-color: var(--primary-color);
    }
  }
  b {
    font-family: Demi;
    font-size: 16px;
    color: var(--text-color);
  }
  p {
    margin: 0;
    width: 30vw;
    min-width: 230px;
    max-width: 390px;
    @include text-shorten;
    @include fluid-font(320px, 1024px, 10px, 14px);
  }
</style>
