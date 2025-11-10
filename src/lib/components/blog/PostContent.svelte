    
<div class="dropcap">
    <slot class="dropcap"/>
</div>

<style>
    .dropcap::first-letter {
        float: left;
        font-size: 4rem;      /* make it large */
        line-height: 0.8;     /* adjust vertical spacing */
        padding-right: 0.1em; /* small space after it */
        font-weight: bold;
        font-family: "Georgia", serif; /* choose a classic serif font */
    }

    .dropcap {
        font-size: 15pt;
        width: 600px;
        width: min(100%, 700px);
        white-space: normal;
        overflow-wrap: break-word;
        justify-self: center;

        height: max-content;
    }
</style>