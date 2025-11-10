<script lang="ts">
	import PostContent from "./PostContent.svelte";
	import PostImage from "./PostImage.svelte";
    import PostTitle from "./PostTitle.svelte";

    export let post_title = "";
    export let post_part = "";
    export let post_part_title = "";
    export let post_image = "";
    export let post_image_alt = "";

</script>
<div id="layout">
    <div style="text-align: right;">
        <PostImage src={post_image} alt={post_image_alt}/>
        <p>Art by @someonehere</p>
    </div>
    <PostTitle>
        {post_title} {post_part}
        <br> &lt{post_part_title}&gt
    </PostTitle>
    <PostContent>
        <slot/>
    </PostContent>
<footer id="page_footer">
    <p id="previous">previous: none</p>

    <p id="next">next: calling conventions</p>
</footer>
</div>

<style>
    #layout {
        padding-top: 100px;
        padding-left: 40px;
        padding-right: 40px;
        display: grid;
        grid-template-columns: min(100%, 700px);
        justify-content: center;
        height: fit-content; 
        row-gap: 30px;
    }

    #page_footer {
        height: 200px;
        width: 600px;
        margin-top: 50px;
        display: flex;
        align-items: top;
        justify-content: center;
        font-size: 18pt;
        column-gap: 100px;
    }

    #previous {
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #A490F4;;
        height: 70px;
        width: 250px;
        border-radius: 15px;
        font-family: "Montserrat", sans-serif;
        text-align: center;
    }
    #next {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background: #6ddaf3;
        height: 70px;
        text-align: center;
        width: 250px;
        border-radius: 15px;
        font-family: "Montserrat", sans-serif;
    }
</style>
