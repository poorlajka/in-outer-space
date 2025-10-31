<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';

    const intro = `
        # Welcome to in_outer_space; a blog by me(lajka) about cybersec/music/life/whatever
        
        To navigate the website use the following commands:
        * ls - list the pages on this website
        * cd <page> - goto the specified page
    `;

    const names = [
        "lajka",
        "case",
        "molly",
        "armitage",
        "finn",
        "flatline",
        "riviera",
        "lady3jane",
        "ashpool",
        "wintermute",
        "neuromancer",
        "julius",
        "hideo",
        "maelcum",
        "linda",
        "newmark",
        "turner",
        "kruskhova",
        "virek",
        "yanaka",
        "henry",
        "mitchell"
    ];

    let name = names[0];
    let name_id = 0;
    let user_input = "";
    function change_name() {
        name = names[(name_id + ++name_id) % names.length];
    }
    let interval: ReturnType<typeof setInterval>;
    onMount(() => {
        interval = setInterval(change_name, 5000); // run every 1000ms (1 second)
    });

    onDestroy(() => {
        clearInterval(interval); // clean up when component is removed
    });


    function handleKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            user_input = "";

        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            user_input = user_input.slice(0, user_input.length-1);
        }
        else {
            user_input += event.key;
        }
    }

</script>

<h1 id="title">
    in_outer_space/<span id="where_at">home</span>
</h1>

<svelte:window on:keydown={handleKey} />
<div id="layout">
    <div id="term_nav">
        <div class="term_output">
            <p style="white-space: pre-line;">{intro}</p>
        </div>
        <div id="prompt_div">
            <div id="prompt_div_left">
                <p id="term_prompt">
                    [{name}@in_outer_space ~]$ &nbsp; {user_input}
                </p>
            </div>
        </div>
    </div>
</div>


<style>
    #title {
        position: absolute;
        color: white;
        margin-left: 30px;
    }

    #light_mode {
        position: absolute;
        color: white;
        right: 30px;
    }

    #layout {
        display: grid;
        place-items: center;
        height: 100vh;
        width: 100vw;
    }

    #term_nav {
        position: absolute;
        padding-top: 10px;
        padding-left: 30px;
        height: 700px;
        width: 1000px;
        background-color: black;
        border: 2px solid white;
    }

    #prompt_div {
        display: flex;
        align-items: center;
        justify-content: left;
    }

    #prompt_div_left {
        display: flex;
        align-items: center;
        width: max-content;
        font-size: 15pt;
        height:max-content;
    }

    #term_prompt {
        color: white;
    }

    #prompt_div_left::after {
        color: white;
        content: "_";
        animation: blink 1s steps(1) infinite;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        50.01%, 100% { opacity: 0; }
    }

    #where_at {
        color: pink;
    }

    .term_output {
        font-size: 13pt;
        color: pink;
        white-space: pre;     
    }
</style>
