
export interface Terminal {
    working_dir: string;
    modifiers: {
        shift: boolean;
        ctrl: boolean;
    };
    root: DirNode;
}

interface FileNode {
    type: "file";
    name: string;
    size?: number;
}

interface DirNode {
    type: "directory";
    link: string;
    name: string;
    children: FileSysNode[];
}

type FileSysNode = FileNode | DirNode;

export const create_term = (): Terminal => ({
    working_dir: "/home/lajka",
    modifiers: {
        shift: false,
        ctrl: false,
    },
    root: create_file_sys(),
});

const get_file_node = (root: DirNode, path: string[]): FileSysNode | null => {
    for (const child of root.children) {
        if (child.name === path[0]) {
            if (path.length === 1 || child.type == "file") {
                return child;
            }
            else if (child.type === "directory") {
                return get_file_node(child, path.slice(1));
            }
        }
    }
    return null;
} 

const create_file_sys = (): DirNode => {
    let file_sys: DirNode = {
        type: "directory",
        name: "/",
        children: [],
    };

    const dir_paths = [
        ["/boot", ""],
        ["/efi",""],
        ["/etc",""],
        ["/home",""],
        ["/home/lajka",""],
        ["/home/lajka/cybersec","/programming"],
        ["/home/lajka/music","/programming"],
        ["/home/lajka/programming","/programming"],
        ["/home/lajka/diary","/programming"],
        ["/root",""],
        ["/srv",""],
        ["/tmp",""],
        ["/usr",""],
        ["/usr/bin",""],
        ["/usr/sbin",""],
        ["/usr/lib",""],
        ["/usr/share",""],
        ["/var",""],
        ["/var/cache",""],
        ["/var/lib",""],
        ["/var/log",""],
        ["/var/tmp",""],
        ["/bin",""],
        ["/sbin",""],
    ];

    for (const [dir_path, dir_link] of dir_paths) {
        mkdir(file_sys, dir_path.slice(1).split("/"), dir_link);
    }

    return file_sys;
}

const mkdir = (root: DirNode, path: string[], link: string) => {

    const child = dir_contains(root, path[0]);

    if (path.length === 1) {
        if (child === null) {
            root.children.push({
                type: "directory",
                name: path[0],
                children: [],
                link,
            });
        }
    }
    else {
        if (child !== null && child.type == "directory") {
            mkdir(child, path.slice(1), link);
        }
    }
}

const dir_contains = (dir: DirNode, name: string): FileSysNode | null => {
    for (const child of dir.children) {
        if (child.name === name) {
            return child;
        }
    }
    return null;
}

export const interpret_command = (term: Terminal, command: string): string => {
    const command_words = command.split(" ");
    const program = command_words[0];
    const args = command_words.slice(1);

    switch (program) {
        case "ls":
            return run_ls(term, args);
        case "cd":
            return run_cd(term, args);
        default:
            return "";
    }
};

const run_ls = (term: Terminal, args: string[]): string => {
    const working_dir = get_file_node(term.root, term.working_dir.slice(1).split("/"));
    if (working_dir === null) {
        return "";
    }

    if (working_dir.type !== "directory") {
        return working_dir.name;
    }

    return working_dir.children
        .reduce((children, child) => children + get_node_html(child) + "&nbsp;".repeat(6), "");
}

const get_node_html = (child: FileSysNode): string => {
    if (child.type === "file") {
        return child.name;
    }

    if (child.link === "") {
        return child.name;
    }
    else {
        return `<a href="${child.link}" class="term_link">🌐${child.name}</a>`;
    }
}


const run_cd = (term: Terminal, args: string[]): string => {
    return "";
}

