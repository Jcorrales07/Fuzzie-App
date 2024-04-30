import React from 'react';
import Workflow from "@/app/(main)/(pages)/workflows/_components/workflow";

type Props = {}

function Workflows(props: Props) {
    return (
        <div className="relative flex flex-col gap-4">
            <section className="flex flex-col gap-4 p-6">
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
                <Workflow description={'Creating a test workflow'} id="1234kk234k1242k34" name="Automation Workflow" publish={false}></Workflow>
            </section>
        </div>
    );
}

export default Workflows;