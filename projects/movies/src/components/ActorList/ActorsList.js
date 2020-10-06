import React from "react";
import Actor from "../Actor/Actor";
import "./ActorsList.css";

const ActorsList = ({ actors }) => {
    const actorsList = actors.map((actor) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

        return (
            <div>
                <Actor
                    image={imageUrl}
                    charName={actor.character}
                    actorName={actor.name}
                    key={actor.id}
                    actorId={actor.id}
                />
            </div>
        );
    });

    return <div className="actors-list">{actorsList}</div>;
};

export default ActorsList;
