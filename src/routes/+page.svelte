<script lang="ts">
  import "../app.css";
  import Setup from "$lib/Setup.svelte";

  let currentMode = 'setup';
  let setupData = {};


</script>


<div class="w-screen h-screen bg-gray-900">
    {#if currentMode === 'setup'}
        <Setup {setupData}/>
    {/if}
  </div>
<div class="text-white text-3xl text-underline">
TEST
</div>


