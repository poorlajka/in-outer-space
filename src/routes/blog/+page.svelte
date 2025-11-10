<script>
	import BlogPost from "$lib/components/blog/BlogPost.svelte";
    import Content from "$lib/content/cybersec/virtualization.svx";
</script>

<ul id="menu">
    <li>cloud_security</li>
    <li>quantum_kill_my_crypto???</li>
    <li>multivariate_cryptography</li>
    <li>mpc_in_the_head</li>
    <li>reverse_engineering &nbsp;&nbsp; &lt== you are here</li>
    <li>cross_site_request_forgery</li>
    <li>linux_privesc</li>
</ul>

<BlogPost
    post_title="Learning reverse engineering"
    post_part="0x00"
    post_part_title="intro"
    post_image="/images/girlinspace.jpg"
    post_image_alt="TODO"
>
    <Content/>
</BlogPost>


<!--<MusicPlayer />-->
<style>

    #menu {
        position: absolute;
        color: white;
        font-size: 14pt;
        margin-top: 80px;
        margin-left: 30px;
        font-family: "Montserrat", sans-serif;
    }

</style>