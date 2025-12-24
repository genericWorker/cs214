<script type="text/javascript">
    $('button').mousedown(function(event) {
    switch (event.which) {
    case 1:
    document.querySelector('.output').innerHTML =
    'Left Mouse Button';
    break;
    case 2:
    document.querySelector('.output').innerHTML =
    'Middle Mouse Button';
    break;
    case 3:
    document.querySelector('.output').innerHTML =
    'Right Mouse Button';
    break;
    default:
    break;
}
});
</script>