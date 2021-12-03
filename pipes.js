function pipes() {
    const station = id => {
        return { station_id: id, outgoing: [] };
    };
    let s1 = station(1);
    let s2 = station(2);
    let s3 = station(3);
    let s4 = station(4);
    let s5 = station(5);
    let s6 = station(6);
    let s7 = station(7);
    let s8 = station(8);
    let s9 = station(9);

    const pipe = (id, station, open) => {
        return { pipe_id: id, downstream: station, open: open };
    }
    let p1 = pipe(1, s2, true);
    let p2 = pipe(2, s3, true);
    let p3 = pipe(3, s4, true);
    let p4 = pipe(4, s5, false);
    let p5 = pipe(5, s3, true);
    let p6 = pipe(6, s6, true);
    let p7 = pipe(7, s7, true);
    let p8 = pipe(8, s8, true);
    let p9 = pipe(9, s9, false);

    s1.outgoing.push(p1, p4, p6);
    s2.outgoing.push(p2);
    s3.outgoing.push(p3);
    s5.outgoing.push(p5);
    s6.outgoing.push(p7, p9);
    s7.outgoing.push(p8);

    let paths = [];
    for (let pipe of s1.outgoing) {
        paths.push([pipe]);
    }
    build_paths(s1, paths);
    console.log('paths: ', paths);
    console.log(paths.filter(path => path.filter(pipe => !pipe.open).length === 0));
}

function build_paths(start, paths) {
    // console.log('start: ', start.station_id);
    for (let pipe of start.outgoing) {
        // console.log('pipe: ', pipe.pipe_id);            
        for (let path of paths) {
            // console.log('path: ', path);
            if (path[path.length - 1].downstream === start) {
                if (start.outgoing.length > 1) {
                    for (let i = 1; i < start.outgoing.length; i++) {
                        let path2 = [...path];
                        // console.log('pushing2', start.outgoing[i].pipe_id, ' onto ', path);
                        path2.push(start.outgoing[i]);
                        paths.push(path2);
                    }
                }
                // console.log('pushing', pipe.pipe_id, ' onto ', path);
                path.push(pipe);
            }
            build_paths(pipe.downstream, paths);
        }
    }
}

pipes();
