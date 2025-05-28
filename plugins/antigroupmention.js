command: ['antigroupmention'],
    operate: async (context) => {
        const { m, db, from, isBotAdmins, isAdmins, isCreator, args, mess, reply } = context;

        if (!m.isGroup) return reply(mess.group); 
        if (!isBotAdmins) return reply(mess.admin); 
        if (!isAdmins && !isCreator) return reply(mess.notadmin); 
        if (args.length < 2) return reply("*Usage: .antigroupmention <delete/kick/warn> <on/off>*");

        const mode = args[0].toLowerCase();
        const state = args[1].toLowerCase();

        if (!["delete", "kick", "warn"].includes(mode)) {
            return reply("*Invalid mode! Use either 'delete', 'kick', or 'warn'.*");
        }

        if (!["on", "off"].includes(state)) {
            return reply("*Invalid state! Use either 'on' or 'off'.*");
        }

        if (state === "on") {
            db.chats[from].antigroupmention = false;
            db.chats[from].antigroupmentionkick = false;
            db.chats[from].antigroupmentionwarn = false;

            if (mode === "delete") db.chats[from].antigroupmention = true;
            else if (mode === "kick") db.chats[from].antigroupmentionkick = true;
            else if (mode === "warn") db.chats[from].antigroupmentionwarn = true;

            reply(`*Successfully enabled antigroupmention ${mode} mode!*`);
        } else if (state === "off") {
            if (mode === "delete" && db.chats[from].antigroupmention) db.chats[from].antigroupmention = false;
            else if (mode === "kick" && db.chats[from].antigroupmentionkick) db.chats[from].antigroupmentionkick = false;
            else if (mode === "warn" && db.chats[from].antigroupmentionwarn) db.chats[from].antigroupmentionwarn = false;
            
            reply(`*Successfully disabled antigroupmention ${mode} mode!*`);
        }
    }
},
