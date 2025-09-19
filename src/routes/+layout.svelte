<script>
  let { children } = $props();
  import "../app.css";
</script>

<div class="p-2">
  {@render children()}
</div>
